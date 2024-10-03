import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MenuItem, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common'; // Adicione esta linha
import { ClienteResponse } from './../../../core/models/clientes/responses/ClienteResponse';
import { ClienteRequest } from './../../../core/models/clientes/requests/ClienteRequest';
import { ClientesService } from './../../../core/services/clientes/clientes.service';
import { DownloadRelatorioService } from './../../../core/services/DownloadRelatorioService.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    TableModule,
    FormsModule,
    SplitButtonModule,
    InputSwitchModule,
    ButtonModule,
    ToastModule,
    RippleModule,
    DialogModule,
    InputTextModule,
    CommonModule, // E adicione aqui também
  ],
  providers: [MessageService],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss',
})
export class ClientesComponent implements OnInit {
  items: MenuItem[];
  clientes: Array<ClienteResponse> = [];
  ativo: boolean = true;
  clienteSelecionado?: ClienteResponse;
  visibilidadeDialogDetalhes: boolean = false;
  clienteRequest: ClienteRequest = new ClienteRequest();

  constructor(
    private messageService: MessageService,
    private clienteService: ClientesService,
    private downloadRelatorioService: DownloadRelatorioService
  ) {
    this.items = [
      {
        label: 'Alterar Status',
        command: () => {
          this.atualizarSituacaoCliente(this.clienteSelecionado!.id);
        },
      },
    ];
  }

  ngOnInit(): void {
    this.buscarListaDeClientes();
  }

  public acaoClique(cliente: ClienteResponse) {
    this.clienteSelecionado = cliente;
  }

  buscarListaDeClientes() {
    this.clienteService
      .buscarListaDeClientes(this.ativo ? 'ATIVO' : 'INATIVO')
      .subscribe((success) => {
        this.clientes = success;
      });
  }

  atualizarSituacaoCliente(id: string) {
    this.clienteSelecionado = undefined;
    this.clienteService.atualizarSituacaoCliente(id).subscribe(() => {
      this.buscarListaDeClientes();
    });
  }

  async cadastrarOuAtualizarCliente() {
    if (this.clienteSelecionado != undefined)
      await this.clienteService
        .atualizarCliente(this.clienteSelecionado.id, this.clienteRequest)
        .subscribe(() => {
          this.showToast('success', 'Informações Atualizadas');
          this.buscarListaDeClientes();
          this.visibilidadeDialogDetalhes = false;
          return;
        });
    else
      await this.clienteService
        .cadastrarCliente(this.clienteRequest)
        .subscribe(() => {
          this.showToast('success', 'Cadastrado com Sucesso');
          this.buscarListaDeClientes();
          this.visibilidadeDialogDetalhes = false;
          return;
        });
    setTimeout(
      () => this.showToast('warning', 'Erro', 'Tente novamente.'),
      5000
    );
  }

  showDialog(clienteSelecionado?: ClienteResponse) {
    this.clienteSelecionado = clienteSelecionado;
    this.clienteRequest = new ClienteRequest();
    if (clienteSelecionado != undefined) {
      this.clienteRequest.nome = clienteSelecionado.nome;
      this.clienteRequest.cpf = clienteSelecionado.cpf;
      this.clienteRequest.celular = clienteSelecionado.celular;
      this.clienteRequest.email = clienteSelecionado.email;
      this.clienteRequest.desejaSerNotificado =
        clienteSelecionado.desejaSerNotificado;
      this.clienteRequest.endereco = clienteSelecionado.enderecoResponse;
    }
    this.visibilidadeDialogDetalhes = true;
  }

  showToast(severity: string, summary: string, detail?: string) {
    this.messageService.add({
      key: 'myKey',
      severity: severity,
      summary: summary,
      detail: detail,
    });
    setTimeout(() => this.clearToast(), 5000);
  }

  clearToast() {
    this.messageService.clear();
  }
}
