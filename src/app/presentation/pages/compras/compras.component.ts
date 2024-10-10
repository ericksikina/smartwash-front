import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ProdutoResponse } from '../../../core/models/produtos/responses/ProdutoResponse';
import { CompraResponse } from '../../../core/models/compra/responses/CompraResponse';
import { CompraDetalheResponse } from '../../../core/models/compra/responses/CompraDetalheResponse';
import { CompraRequest } from '../../../core/models/compra/requests/CompraRequest';
import { CompraProdutoRequest } from '../../../core/models/compra/requests/CompraProdutoRequest';
import { ComprasService } from '../../../core/services/compras/compras.service';
import { ProdutosService } from '../../../core/services/produtos/produtos.service';
import { FornecedoresService } from '../../../core/services/fornecedores/fornecedores.service';
import { FornecedorResponse } from '../../../core/models/fornecedores/responses/FornecedorResponse';

@Component({
  selector: 'app-compras',
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
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.scss',
})
export class ComprasComponent {
  fornecedores: Array<FornecedorResponse> = [];
  fornecedorSelecionado?: FornecedorResponse;

  produtos: Array<ProdutoResponse> = [];
  produtoSelecionado?: ProdutoResponse;

  compras: Array<CompraResponse> = [];
  listaDeProdutos: CompraDetalheResponse[] = [];

  compraRequest: CompraRequest = new CompraRequest();
  compraProdutoRequest: CompraProdutoRequest = new CompraProdutoRequest();
  compraSelecionada?: CompraProdutoRequest;

  ativo: boolean = true;

  visibilidadeDialogForm: boolean = false;
  visibilidadeDialogProdutos: boolean = false;

  constructor(
    private messageService: MessageService,
    private comprasService: ComprasService,
    private fornecedoresService: FornecedoresService,
    private produtosService: ProdutosService
  ) {}

  ngOnInit(): void {
    this.buscarListaDeCompras();
  }

  buscarProdutos(): void {
    this.produtosService
      .buscarListaDeProdutos('ATIVO')
      .subscribe((resposta: Array<ProdutoResponse>) => {
        this.produtos = resposta;
      });
  }

  buscarFornecedores(): void {
    this.fornecedoresService
      .buscarListaDeFornecedores('ATIVO')
      .subscribe((resposta) => {
        this.fornecedores = resposta;
      });
  }

  buscarListaDeCompras(): void {
    this.comprasService.buscarListaDeCompra().subscribe((success) => {
      this.compras = success;
    });
  }

  cadastrarCompra(): void {
    this.showToast('info', 'Carregando...', 'Aguarde alguns segundos');
    this.compraRequest.fornecedor = this.fornecedorSelecionado!.id;
    this.comprasService.cadastrarCompra(this.compraRequest).subscribe(() => {
      this.compraRequest = new CompraRequest();
      this.compraProdutoRequest = new CompraProdutoRequest();
      this.showToast('success', 'Cadastro feito com sucesso');
      this.buscarListaDeCompras();
      this.visibilidadeDialogForm = false;
    });
  }

  adicionarProduto(): void {
    this.compraProdutoRequest!.produto = this.produtoSelecionado!.id;
    this.compraRequest.listaDeProdutos.push(this.compraProdutoRequest);
    this.comprasService
      .calcularValorTotalCompra(this.compraRequest.listaDeProdutos)
      .subscribe((success) => {
        this.compraRequest.valorTotal = success;
      });
    this.compraProdutoRequest = new CompraProdutoRequest();
  }

  removerProduto(index: number): void {
    let i = -1;
    this.compraRequest.listaDeProdutos =
      this.compraRequest.listaDeProdutos.filter((p) => {
        i++;
        return i != index;
      });
    this.compraProdutoRequest = new CompraProdutoRequest();
    this.comprasService
      .calcularValorTotalCompra(this.compraRequest.listaDeProdutos)
      .subscribe((success) => {
        this.compraRequest.valorTotal = success;
      });
  }

  selecionarFornecedor(): void {
    this.fornecedorSelecionado = this.fornecedores.filter(
      (p) => p.descricao == this.compraRequest!.fornecedor
    )[0];
  }

  selecionarProduto(): void {
    this.produtoSelecionado = this.produtos.filter(
      (p) => p.descricao == this.compraProdutoRequest!.produto
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
    this.buscarProdutos();
    this.buscarFornecedores();
    this.compraRequest = new CompraRequest();
    this.compraProdutoRequest = new CompraProdutoRequest();
    this.visibilidadeDialogForm = true;
  }

  showDialogProdutos(compraResponse: CompraResponse) {
    this.listaDeProdutos = compraResponse.listaDeCompra;
    this.visibilidadeDialogProdutos = true;
  }
}
