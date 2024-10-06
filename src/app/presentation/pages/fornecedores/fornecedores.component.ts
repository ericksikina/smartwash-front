import { Component, OnInit } from '@angular/core';
import { FornecedorRequest } from './../../../core/models/fornecedores/requests/FornecedorRequest';
import { FornecedorResponse } from './../../../core/models/fornecedores/responses/FornecedorResponse';
import { FornecedoresService } from './../../../core/services/fornecedores/fornecedores.service';
import { MenuItem, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-fornecedores',
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
  templateUrl: './fornecedores.component.html',
  styleUrl: './fornecedores.component.scss',
})
export class FornecedoresComponent implements OnInit {
  items: MenuItem[];
  fornecedores: Array<FornecedorResponse> = [];

  ativo: boolean = true;

  fornecedorSelecionado?: FornecedorResponse;

  visibilidadeDialogForm: boolean = false;

  fornecedorRequest: FornecedorRequest = new FornecedorRequest();

  constructor(
    private fornecedoresService: FornecedoresService,
    private messageService: MessageService
  ) {
    this.items = [
      {
        label: 'Alterar Status',
        command: () => {
          this.atualizarSituacaoFornecedor(this.fornecedorSelecionado!.id);
        },
      },
    ];
  }

  ngOnInit(): void {
    this.buscarListaDeFornecedores();
  }

  acaoClique(fornecedor: FornecedorResponse) {
    this.fornecedorSelecionado = fornecedor;
  }

  buscarListaDeFornecedores() {
    this.fornecedoresService
      .buscarListaDeFornecedores(this.ativo ? 'ATIVO' : 'INATIVO')
      .subscribe((success) => {
        this.fornecedores = success;
      });
  }

  atualizarSituacaoFornecedor(id: string) {
    this.fornecedorSelecionado = undefined;
    this.fornecedoresService.atualizarSituacaoFornecedor(id).subscribe(() => {
      this.buscarListaDeFornecedores();
    });
  }

  cadastrarOuAtualizarFornecedor() {
    if (this.fornecedorSelecionado) {
      this.fornecedoresService
        .atualizarFornecedor(
          this.fornecedorSelecionado.id,
          this.fornecedorRequest
        )
        .subscribe(() => {
          this.showToast('success', 'Fornecedor atualizado com sucesso');
          this.buscarListaDeFornecedores();
          this.visibilidadeDialogForm = false;
        });
    } else {
      this.fornecedoresService
        .cadastrarFornecedor(this.fornecedorRequest)
        .subscribe(() => {
          this.showToast('success', 'Fornecedor cadastrado com sucesso');
          this.buscarListaDeFornecedores();
          this.visibilidadeDialogForm = false;
        });
    }
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

  showDialog(fornecedorSelecionado?: FornecedorResponse) {
    this.fornecedorSelecionado = fornecedorSelecionado;
    this.fornecedorRequest = new FornecedorRequest();
    if (fornecedorSelecionado) {
      this.fornecedorRequest.descricao = fornecedorSelecionado.descricao;
      this.fornecedorRequest.cnpj = fornecedorSelecionado.cnpj;
      this.fornecedorRequest.telefone = fornecedorSelecionado.telefone;
    }
    this.visibilidadeDialogForm = true;
  }
}
