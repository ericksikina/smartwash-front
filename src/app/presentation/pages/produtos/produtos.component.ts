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
import { BaixaEstoqueResponse } from '../../../core/models/baixaEstoque/response/BaixaEstoqueResponse';
import { BaixaEstoqueDetalheResponse } from '../../../core/models/baixaEstoque/response/BaixaEstoqueDetalheResponse';
import { BaixaEstoqueRequest } from '../../../core/models/baixaEstoque/request/BaixaEstoqueRequest';
import { BaixaEstoqueProdutoRequest } from '../../../core/models/baixaEstoque/request/BaixaEstoqueProdutoRequest';
import { ProdutosService } from '../../../core/services/produtos/produtos.service';
import { DownloadRelatorioService } from '../../../core/services/DownloadRelatorioService.service';

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

  estoquesBaixos: Array<BaixaEstoqueResponse> = [];
  listaDeProdutos: BaixaEstoqueDetalheResponse[] = [];

  baixaEstoqueRequest: BaixaEstoqueRequest = new BaixaEstoqueRequest();
  baixaEstoqueProdutoRequest: BaixaEstoqueProdutoRequest =
    new BaixaEstoqueProdutoRequest();
  baixaEstoqueSelecionado?: BaixaEstoqueProdutoRequest;

  items: MenuItem[];
  relatorios: MenuItem[];
  filtros: MenuItem[];
  filtroAtivo: boolean = false;

  ativo: boolean = true;

  visibilidadeDialogForm: boolean = false;
  visibilidadeDialogProdutos: boolean = false;

  constructor(
    private messageService: MessageService,
    private produtosService: ProdutosService,
    private downloadRelatorioService: DownloadRelatorioService
  ) {
    this.filtros = [
      {
        label: 'Estoque Baixo',
        command: () => {
          this.filtroAtivo = true;
          this.buscarProdutosEstoqueBaixo();
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
    this.items = [
      {
        label: 'Alterar Status',
        command: () => {
          this.atualizarSituacaoProduto(this.produtoSelecionado!.id);
        },
      },
    ];
  }

  ngOnInit(): void {
    this.buscarProdutos();
  }

  // Método para buscar a lista de produtos
  buscarProdutos(): void {
    this.filtroAtivo = false;
    this.produtosService
      .buscarListaDeProdutos(this.ativo ? 'ATIVO' : 'INATIVO')
      .subscribe((resposta: Array<ProdutoResponse>) => {
        this.produtos = resposta;
      });
  }

  buscarProdutosEstoqueBaixo(): void {
    this.produtosService
      .buscarListaDeProdutosEmBaixoEstoque()
      .subscribe((resposta: Array<BaixaEstoqueResponse>) => {
        this.estoquesBaixos = resposta;
      });
  }

  // Método para cadastrar um novo produto
  cadastrarProduto(): void {
    this.produtosService.cadastrarProduto(this.novoProduto).subscribe(() => {
      this.buscarProdutos(); // Atualizar lista de produtos após cadastro
    });
  }

  cadastrarBaixa(): void {
    this.showToast('info', 'Carregando...', 'Aguarde alguns segundos');
    this.produtosService
      .cadastrarBaixa(this.baixaEstoqueRequest)
      .subscribe(() => {
        this.baixaEstoqueRequest = new BaixaEstoqueRequest();
        this.baixaEstoqueProdutoRequest = new BaixaEstoqueProdutoRequest();
        this.showToast('success', 'Cadastro feito com sucesso');
        this.buscarProdutosEstoqueBaixo();
        this.visibilidadeDialogForm = false;
      });
  }

  // Método para atualizar um produto
  atualizarDadosProduto(id: string): void {
    this.produtoSelecionado = undefined;
    this.produtosService
      .atualizarProduto(id, this.atualizarProduto)
      .subscribe(() => {
        this.buscarProdutos(); // Atualizar lista de produtos após atualização
      });
  }

  // Método para atualizar a situação do produto
  atualizarSituacaoProduto(id: string): void {
    this.produtoSelecionado = undefined;
    this.produtosService.atualizarSituacaoProduto(id).subscribe(() => {
      this.buscarProdutos(); // Atualizar lista após a mudança de situação
    });
  }

  // Método para gerar relatório de produtos
  gerarRelatorio(): void {
    this.showToast('info', 'Carregando...', 'Aguarde alguns segundos');
    this.produtosService.gerarRelatorioDeProduto().subscribe((resposta) => {
      this.clearToast();
      this.downloadRelatorioService.baixaRelatorio(resposta, 'Produtos.pdf');
    });
  }

  // Gerar relatório de produtos com estoque baixo
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

  adicionarProduto(): void {
    this.baixaEstoqueProdutoRequest!.produto = this.produtoSelecionado!.id;
    this.baixaEstoqueRequest.listaDeProdutos.push(
      this.baixaEstoqueProdutoRequest!
    );
    this.baixaEstoqueProdutoRequest = new BaixaEstoqueProdutoRequest();
  }

  removerProduto(index: number): void {
    let i = -1;
    this.baixaEstoqueRequest.listaDeProdutos =
      this.baixaEstoqueRequest.listaDeProdutos.filter((p) => {
        i++;
        return i != index;
      });
    this.baixaEstoqueProdutoRequest = new BaixaEstoqueProdutoRequest();
  }

  selecionarProduto(): void {
    this.produtoSelecionado = this.produtos.filter(
      (p) => p.descricao == this.baixaEstoqueProdutoRequest!.produto
    )[0];
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
    this.baixaEstoqueRequest = new BaixaEstoqueRequest();
    this.baixaEstoqueProdutoRequest = new BaixaEstoqueProdutoRequest();
    this.visibilidadeDialogForm = true;
  }

  showDialogProdutos(baixaEstoqueResponse: BaixaEstoqueResponse) {
    this.listaDeProdutos = baixaEstoqueResponse.listaDeProdutos;
    this.visibilidadeDialogProdutos = true;
  }

  public acaoClique(any: any) {
    this.produtoSelecionado = any;
  }
}
