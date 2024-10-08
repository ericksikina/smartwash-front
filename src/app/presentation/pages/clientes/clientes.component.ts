import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ClientesService } from '../../../core/services/clientes/clientes.service';
import { MenuItem, MessageService } from 'primeng/api';
import { ClienteResponse } from '../../../core/models/clientes/responses/ClienteResponse';
import { EnderecoService } from '../../../core/services/utils/endereco.service';
import { DatePipe } from '@angular/common';
import { ClienteRequest } from '../../../core/models/clientes/requests/ClienteRequest';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [
    TableModule,
    FormsModule,
    SplitButtonModule,
    InputSwitchModule,
    ButtonModule,
    SelectButtonModule,
    ToastModule,
    RippleModule,
    DialogModule,
    InputTextModule,
    DatePipe,
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

  visibilidadeDialogForm: boolean = false;
  visibilidadeDialogInformacoes: boolean = false;

  clienteRequest: ClienteRequest = new ClienteRequest();

  constructor(
    private messageService: MessageService,
    private clienteService: ClientesService,
    private enderecoService: EnderecoService
  ) {
    this.items = [
      {
        label: 'Alterar Status',
        command: () => {
          this.atualizarSituacaoCliente(this.clienteSelecionado!.id);
        },
      },
      {
        label: 'Visualizar Dados',
        command: () => {
          this.showDialogInformacoes();
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

  // cadastraCliente() {
  //   this.showToast('info', 'Cadastrando...', 'Aguarde alguns segundos');
  //   this.clienteService.cadastrarCliente(this.clienteRequest).subscribe(() => {
  //     this.clearToast();
  //     this.showToast('success', 'Cliente cadastrado com sucesso!');
  //     this.buscarListaDeClientes();
  //     this.visibilidadeDialogForm = false;
  //   });
  // }

  // atualizarCliente() {
  //   this.showToast('info', 'Atualizando...', 'Aguarde alguns segundos');
  //   this.clienteService
  //     .atualizarCliente(this.clienteSelecionado!.id, this.clienteRequest)
  //     .subscribe(() => {
  //       this.clearToast();
  //       this.showToast('success', 'Cliente atualizado com sucesso!');
  //       this.buscarListaDeClientes();
  //       this.visibilidadeDialogFormAtualizar = false;
  //     });
  // }

  async cadastrarOuAtualizarCliente() {
    if (this.clienteSelecionado != undefined)
      await this.clienteService
        .atualizarCliente(this.clienteSelecionado.id, this.clienteRequest)
        .subscribe((success) => {
          this.showToast('success', 'Informações Atualizadas');
          this.buscarListaDeClientes();
          this.visibilidadeDialogForm = false;
          return;
        });
    else
      await this.clienteService
        .cadastrarCliente(this.clienteRequest)
        .subscribe((success) => {
          this.showToast('success', 'Cadastrado com Sucesso');
          this.buscarListaDeClientes();
          this.visibilidadeDialogForm = false;
          return;
        });
    setTimeout(
      () =>
        this.showToast(
          'warning',
          'Algo esta Errado',
          'Verifique os dados ou aguarde uns segundos e tente novamente'
        ),
      2147483647
    );
  }

  buscarEnderecoComViaCEP(cep: string) {
    this.enderecoService
      .buscarDadosDeEnderecoPeloCep(cep)
      .subscribe((success) => {
        this.clienteRequest.endereco.converter(success);
        console.log(this.clienteRequest.endereco);
      });
  }

  showToast(serverity: string, summary: string, detail?: string) {
    this.messageService.add({
      key: 'myKey',
      severity: serverity,
      summary: summary,
      detail: detail,
    });
    setTimeout(() => this.clearToast(), 5000);
  }

  clearToast() {
    this.messageService.clear();
  }

  showDialogInformacoes() {
    this.visibilidadeDialogInformacoes = true;
  }

  showDialog(clienteSelecionado?: ClienteResponse) {
    this.clienteSelecionado = clienteSelecionado;
    this.clienteRequest = new ClienteRequest();
    if (clienteSelecionado != undefined) {
      this.clienteRequest.converter(clienteSelecionado!);
    }
    this.visibilidadeDialogForm = true;
  }
}
