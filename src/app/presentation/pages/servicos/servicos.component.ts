import { ServicoRequest } from './../../../core/models/servicos/requests/ServicoRequest';
import { DownloadRelatorioService } from './../../../core/services/DownloadRelatorioService.service';
import { ServicoResponse } from './../../../core/models/servicos/responses/ServicoResponse';
import { ServicosService } from './../../../core/services/servicos/servicos.service';
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

@Component({
  selector: 'app-servicos',
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
  ],
  providers: [MessageService],
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.css',
})
export class ServicosComponent implements OnInit {
  items: MenuItem[];
  servicos: Array<ServicoResponse> = [];

  ativo: boolean = true;

  servicoSelecionado?: ServicoResponse;

  visibilidadeDialogForm: boolean = false;

  servicoRequest: ServicoRequest = new ServicoRequest();

  constructor(
    private messageService: MessageService,
    private servicoService: ServicosService,
    private downloadRelatorioService: DownloadRelatorioService
  ) {
    this.items = [
      {
        label: 'Alterar Status',
        command: () => {
          this.atualizarSituacaoServico(this.servicoSelecionado!.id);
        },
      },
    ];
  }
  ngOnInit(): void {
    this.buscarListaDeServico();
  }

  public acaoClique(servico: ServicoResponse) {
    this.servicoSelecionado = servico;
  }

  buscarListaDeServico() {
    this.servicoService
      .buscarListaDeServicos(this.ativo ? 'ATIVO' : 'INATIVO')
      .subscribe((success) => {
        this.servicos = success;
      });
  }

  atualizarSituacaoServico(id: string) {
    this.servicoSelecionado = undefined;
    this.servicoService.atualizarSituacaoServico(id).subscribe((success) => {
      this.buscarListaDeServico();
    });
  }

  async cadastrarOuAtualizarServico() {
    if (this.servicoSelecionado != undefined)
      await this.servicoService
        .atualizarServico(this.servicoSelecionado.id, this.servicoRequest)
        .subscribe((success) => {
          this.showToast('success', 'Informações Atualizadas');
          this.buscarListaDeServico();
          this.visibilidadeDialogForm = false;
          return;
        });
    else
      await this.servicoService
        .cadastrarServico(this.servicoRequest)
        .subscribe((success) => {
          this.showToast('success', 'Cadastrado com Sucesso');
          this.buscarListaDeServico();
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

  gerarRelatorioDeServico() {
    this.showToast('info', 'Carregando...', 'Aguarde alguns Segundos');
    this.servicoService.gerarRelatorioDeServico().subscribe((success) => {
      this.downloadRelatorioService.baixaRelatorio(success, 'Servicos.pdf');
      this.clearToast();
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

  showDialog(servicoSelecionado?: ServicoResponse) {
    this.servicoSelecionado = servicoSelecionado;
    this.servicoRequest = new ServicoRequest();
    if (servicoSelecionado != undefined) {
      this.servicoRequest.descricao = servicoSelecionado.descricao;
      this.servicoRequest.preco = servicoSelecionado.preco;
    }
    this.visibilidadeDialogForm = true;
  }
}
