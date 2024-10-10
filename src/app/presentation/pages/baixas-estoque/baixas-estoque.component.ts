import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { DataRequest } from '../../../core/models/utils/requests/DataRequest';
import { BaixaEstoqueResponse } from '../../../core/models/baixaEstoque/response/BaixaEstoqueResponse';
import { BaixaEstoqueDetalheResponse } from '../../../core/models/baixaEstoque/response/BaixaEstoqueDetalheResponse';
import { BaixaEstoqueRequest } from '../../../core/models/baixaEstoque/request/BaixaEstoqueRequest';
import { BaixaEstoqueProdutoRequest } from '../../../core/models/baixaEstoque/request/BaixaEstoqueProdutoRequest';
import { BaixaEstoqueService } from '../../../core/services/baixasEstoque/baixas-estoque.service';
import { ProdutoResponse } from '../../../core/models/produtos/responses/ProdutoResponse';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ProdutosService } from '../../../core/services/produtos/produtos.service';

@Component({
  selector: 'app-baixas-estoque',
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
  templateUrl: './baixas-estoque.component.html',
  styleUrl: './baixas-estoque.component.scss',
})
export class BaixasEstoqueComponent {
  produtos: Array<ProdutoResponse> = [];
  produtoSelecionado?: ProdutoResponse;

  dataRequest: DataRequest = new DataRequest();

  estoquesBaixos: Array<BaixaEstoqueResponse> = [];
  listaDeProdutos: BaixaEstoqueDetalheResponse[] = [];

  baixaEstoqueRequest: BaixaEstoqueRequest = new BaixaEstoqueRequest();
  baixaEstoqueProdutoRequest: BaixaEstoqueProdutoRequest =
    new BaixaEstoqueProdutoRequest();
  baixaEstoqueSelecionado?: BaixaEstoqueProdutoRequest;

  ativo: boolean = true;

  visibilidadeDialogForm: boolean = false;
  visibilidadeDialogProdutos: boolean = false;

  constructor(
    private messageService: MessageService,
    private baixaEstoqueService: BaixaEstoqueService,
    private produtosService: ProdutosService
  ) {}

  ngOnInit(): void {
    this.buscarProdutosEstoqueBaixo();
  }

  buscarProdutos(): void {
    this.produtosService
      .buscarListaDeProdutos('ATIVO')
      .subscribe((resposta: Array<ProdutoResponse>) => {
        this.produtos = resposta;
      });
  }

  buscarProdutosEstoqueBaixo(): void {
    this.baixaEstoqueService
      .buscarListaDeProdutosEstoqueBaixo()
      .subscribe((resposta: Array<BaixaEstoqueResponse>) => {
        this.estoquesBaixos = resposta;
      });
  }

  buscarListaDeBaixaEstoqueFiltradoPorData(): void {
    this.baixaEstoqueService
      .buscarListaDeBaixaEstoqueFiltradoPorData(this.dataRequest)
      .subscribe((resposta: Array<BaixaEstoqueResponse>) => {
        this.estoquesBaixos = resposta;
      });
  }

  cadastrarBaixa(): void {
    this.showToast('info', 'Carregando...', 'Aguarde alguns segundos');
    this.baixaEstoqueService
      .cadastrarBaixa(this.baixaEstoqueRequest)
      .subscribe(() => {
        this.baixaEstoqueRequest = new BaixaEstoqueRequest();
        this.baixaEstoqueProdutoRequest = new BaixaEstoqueProdutoRequest();
        this.showToast('success', 'Cadastro feito com sucesso');
        this.buscarProdutosEstoqueBaixo();
        this.visibilidadeDialogForm = false;
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
    this.buscarProdutos();
    this.visibilidadeDialogForm = true;
  }

  showDialogProdutos(baixaEstoqueResponse: BaixaEstoqueResponse) {
    this.listaDeProdutos = baixaEstoqueResponse.listaDeProdutos;
    this.visibilidadeDialogProdutos = true;
  }
}
