import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ProdutoResponse } from '../../../core/models/produtos/responses/ProdutoResponse';
import { CadastrarProdutoRequest } from '../../../core/models/produtos/requests/CadastrarProdutoRequest';
import { AtualizarProdutoRequest } from '../../../core/models/produtos/requests/AtualizarProdutoRequest';
import { ProdutosService } from '../../../core/services/produtos/produtos.service';
import { DownloadRelatorioService } from '../../../core/services/utils/DownloadRelatorioService.service';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-produtos',
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
  ],
  providers: [MessageService],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss',
})
export class ProdutosComponent implements OnInit {
  produtos: Array<ProdutoResponse> = [];
  produtoSelecionado?: ProdutoResponse;
  novoProduto: CadastrarProdutoRequest = new CadastrarProdutoRequest();
  atualizarProduto: AtualizarProdutoRequest = new AtualizarProdutoRequest();

  relatorios: MenuItem[];
  items: MenuItem[];

  ativo: boolean = true;

  visibilidadeDialogFormCadastro: boolean = false;
  visibilidadeDialogFormAtualizar: boolean = false;

  constructor(
    private messageService: MessageService,
    private produtosService: ProdutosService,
    private downloadRelatorioService: DownloadRelatorioService
  ) {
    this.items = [
      {
        label: 'Alterar Status',
        command: () => {
          this.atualizarSituacaoProduto(this.produtoSelecionado!.id);
        },
      },
    ];
    this.relatorios = [
      {
        label: 'Estoque Baixo',
        command: () => {
          this.gerarRelatorioComEstoqueBaixo();
        },
      },
    ];
  }

  ngOnInit(): void {
    this.buscarProdutos();
  }

  buscarProdutos(): void {
    this.produtosService
      .buscarListaDeProdutos(this.ativo ? 'ATIVO' : 'INATIVO')
      .subscribe((resposta: Array<ProdutoResponse>) => {
        this.produtos = resposta;
      });
  }

  cadastrarProduto(): void {
    this.showToast('info', 'Cadastrando...', 'Aguarde alguns segundos');
    this.produtosService.cadastrarProduto(this.novoProduto).subscribe(() => {
      this.clearToast();
      this.showToast('success', 'Cadastrado com sucesso!');
      this.buscarProdutos();
      this.visibilidadeDialogFormCadastro = false;
    });
  }

  atualizarDadosProduto(): void {
    this.showToast('info', 'Carregando...', 'Aguarde alguns segundos');
    this.produtosService
      .atualizarProduto(this.produtoSelecionado!.id, this.atualizarProduto)
      .subscribe(() => {
        this.atualizarProduto = new AtualizarProdutoRequest();
        this.showToast('success', 'Cadastro feito com sucesso');
        this.buscarProdutos();
        this.visibilidadeDialogFormAtualizar = false;
      });
  }

  atualizarSituacaoProduto(id: string): void {
    this.produtoSelecionado = undefined;
    this.produtosService.atualizarSituacaoProduto(id).subscribe(() => {
      this.buscarProdutos(); // Atualizar lista após a mudança de situação
    });
  }

  gerarRelatorio(): void {
    this.showToast('info', 'Carregando...', 'Aguarde alguns segundos');
    this.produtosService.gerarRelatorioDeProduto().subscribe((resposta) => {
      this.clearToast();
      this.downloadRelatorioService.baixaRelatorio(resposta, 'Produtos.pdf');
    });
  }

  gerarRelatorioComEstoqueBaixo(): void {
    this.showToast('info', 'Carregando...', 'Aguarde alguns segundos');
    this.produtosService
      .gerarRelatorioDeProdutoComEstoqueBaixo()
      .subscribe((resposta) => {
        this.clearToast();
        this.downloadRelatorioService.baixaRelatorio(
          resposta,
          'ProdutosComEstoqueBaixo.pdf'
        );
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

  showDialogCadastro() {
    this.novoProduto = new CadastrarProdutoRequest();
    this.visibilidadeDialogFormCadastro = true;
  }

  showDialogAtualizar(produtoSelecionado: ProdutoResponse) {
    this.atualizarProduto = new AtualizarProdutoRequest();
    this.produtoSelecionado = produtoSelecionado;
    this.atualizarProduto.descricao = produtoSelecionado.descricao;
    this.atualizarProduto.estoqueMinimo = produtoSelecionado.estoqueMinimo;
    this.visibilidadeDialogFormAtualizar = true;
  }

  public acaoClique(any: any) {
    this.produtoSelecionado = any;
  }
}
