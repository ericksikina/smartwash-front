import { FuncionarioService } from './../../../core/services/funcionario/funcionarios.service';
import { CadastrarFuncionarioRequest } from './../../../core/models/funcionarios/requests/CadastrarFuncionarioRequest';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { FuncionarioResponse } from '../../../core/models/funcionarios/responses/FuncionarioResponse';
import { MenuItem, MessageService } from 'primeng/api';
import { DownloadRelatorioService } from '../../../core/services/DownloadRelatorioService.service';

@Component({
  selector: 'app-funcionario',
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
  templateUrl: './funcionario.component.html',
  styleUrl: './funcionario.component.scss',
})
export class FuncionariosComponent implements OnInit {
  items: MenuItem[];
  funcionarios: Array<FuncionarioResponse> = [];

  ativo: boolean = true;

  funcionarioSelecionado?: FuncionarioResponse;

  visibilidadeDialogForm: boolean = false;

  cadastrarFuncionarioRequest: CadastrarFuncionarioRequest =
    new CadastrarFuncionarioRequest();

  constructor(
    private messageService: MessageService,
    private funcionarioService: FuncionarioService,
    private downloadRelatorioService: DownloadRelatorioService
  ) {
    this.items = [
      {
        label: 'Alterar Status',
        command: () => {
          this.atualizarSituacaoServico(this.funcionarioSelecionado!.id);
        },
      },
    ];
  }
  ngOnInit(): void {
    this.buscarListaDeFuncionarios();
  }

  public acaoClique(funcionario: FuncionarioResponse) {
    this.funcionarioSelecionado = funcionario;
  }

  buscarListaDeFuncionarios() {
    this.funcionarioService
      .buscarListaDeFuncionarios(this.ativo ? 'ATIVO' : 'INATIVO')
      .subscribe((success) => {
        this.funcionarios = success;
      });
  }

  atualizarSituacaoServico(id: string) {
    this.funcionarioSelecionado = undefined;
    this.funcionarioService
      .atualizarSituacaoFuncionario(id)
      .subscribe((success) => {
        this.buscarListaDeFuncionarios();
      });
  }

  gerarRelatorioDeFuncionario() {
    this.showToast('info', 'Carregando...', 'Aguarde alguns Segundos');
    this.funcionarioService
      .gerarRelatorioDeFuncionario()
      .subscribe((success) => {
        this.downloadRelatorioService.baixaRelatorio(
          success,
          'Funcionarios.pdf'
        );
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

  showDialogCadastro(funcionarioSelecionado?: FuncionarioResponse) {
    this.funcionarioSelecionado = funcionarioSelecionado;
    this.cadastrarFuncionarioRequest = new CadastrarFuncionarioRequest();
    this.visibilidadeDialogForm = true;
  }
}
