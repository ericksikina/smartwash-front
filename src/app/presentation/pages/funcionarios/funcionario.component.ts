import { AtualizarFuncionarioRequest } from './../../../core/models/funcionarios/requests/AtualizarFuncionarioRequest';
import { FuncionarioService } from '../../../core/services/funcionarios/funcionarios.service';
import { CadastrarFuncionarioRequest } from './../../../core/models/funcionarios/requests/CadastrarFuncionarioRequest';
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
import { FuncionarioResponse } from '../../../core/models/funcionarios/responses/FuncionarioResponse';
import { MenuItem, MessageService } from 'primeng/api';
import { DownloadRelatorioService } from '../../../core/services/utils/DownloadRelatorioService.service';
import { CalendarModule } from 'primeng/calendar';
import { EnderecoService } from '../../../core/services/utils/endereco.service';
import { DatePipe } from '@angular/common';

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
    CalendarModule,
    DatePipe,
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
  visibilidadeDialogFormAtualizar: boolean = false;
  visibilidadeDialogInformacoes: boolean = false;

  cadastrarFuncionarioRequest: CadastrarFuncionarioRequest =
    new CadastrarFuncionarioRequest();

  atualizarFuncionarioRequest: AtualizarFuncionarioRequest =
    new AtualizarFuncionarioRequest();

  constructor(
    private messageService: MessageService,
    private funcionarioService: FuncionarioService,
    private enderecoService: EnderecoService,
    private downloadRelatorioService: DownloadRelatorioService
  ) {
    this.items = [
      {
        label: 'Alterar Status',
        command: () => {
          this.atualizarSituacaoServico(this.funcionarioSelecionado!.id);
        },
      },
      {
        label: 'Visualizar Dados',
        command: () => {
          this.showDialog();
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

  cadastraFuncionario() {
    this.showToast('info', 'Cadastrando...', 'Aguarde alguns Segundos');
    this.funcionarioService
      .cadastraFuncionario(this.cadastrarFuncionarioRequest)
      .subscribe((success) => {
        this.clearToast();
        this.showToast('success', 'Criado com sucesso!');
        this.buscarListaDeFuncionarios();
        this.visibilidadeDialogForm = false;
      });
  }

  atualizarFuncionario() {
    this.showToast('info', 'Atualizando...', 'Aguarde alguns Segundos');
    this.funcionarioService
      .atualizarFuncionario(
        this.funcionarioSelecionado!.id,
        this.atualizarFuncionarioRequest
      )
      .subscribe((success) => {
        this.clearToast();
        this.showToast('success', 'Atualizado!');
        this.buscarListaDeFuncionarios();
        this.visibilidadeDialogFormAtualizar = false;
      });
  }

  buscarEnderecoComViaCEP(cep: string) {
    this.enderecoService
      .buscarDadosDeEnderecoPeloCep(cep)
      .subscribe((success) => {
        this.cadastrarFuncionarioRequest.endereco.converter(success);
        console.log(this.cadastrarFuncionarioRequest.endereco);
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

  showDialog() {
    this.funcionarioSelecionado!.dataContratacao = new Date(
      this.funcionarioSelecionado!.dataContratacao
    );
    this.funcionarioSelecionado!.dataContratacao.setDate(
      this.funcionarioSelecionado!.dataContratacao.getDate() + 1
    );
    this.visibilidadeDialogInformacoes = true;
  }

  showDialogCadastro() {
    this.cadastrarFuncionarioRequest = new CadastrarFuncionarioRequest();
    this.visibilidadeDialogForm = true;
  }

  showDialogAtualizar(funcionarioSelecionado: FuncionarioResponse) {
    this.funcionarioSelecionado = funcionarioSelecionado;
    this.atualizarFuncionarioRequest = new AtualizarFuncionarioRequest();
    this.atualizarFuncionarioRequest.converter(funcionarioSelecionado!);
    this.visibilidadeDialogFormAtualizar = true;
  }
}
