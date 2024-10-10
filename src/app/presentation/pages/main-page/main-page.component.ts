import { ServicosService } from './../../../core/services/servicos/servicos.service';
import { ProdutosService } from './../../../core/services/produtos/produtos.service';
import { DownloadRelatorioService } from './../../../core/services/utils/DownloadRelatorioService.service';
import { PedidosService } from './../../../core/services/pedidos/pedidos.service';
import { FuncionarioService } from './../../../core/services/funcionarios/funcionarios.service';
import { DataRequest } from './../../../core/models/utils/requests/DataRequest';
import { MenuItem } from 'primeng/api';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [ButtonModule, CalendarModule, SplitButtonModule, FormsModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  relatoriosProdutos: Array<MenuItem> = [];

  dataRequestAtiva: boolean = false;

  dataRequest: DataRequest = new DataRequest();

  constructor(
    private funcionarioService: FuncionarioService,
    private pedidosService: PedidosService,
    private produtosService: ProdutosService,
    private servicosService: ServicosService,
    private downloadRelatorioService: DownloadRelatorioService
  ) {
    this.relatoriosProdutos = [
      {
        label: 'Estoque Baixo',
        command: () => {
          this.baixarRelatorio(4);
        },
      },
    ];
  }

  i: number = 0;
  abrirFormsDataRequest() {
    this.dataRequestAtiva = this.i % 2 == 0;
    this.i++;
    this.dataRequest = new DataRequest();
  }

  baixarRelatorio(i: number) {
    if (i == 1) {
      this.baixarRelatorioFuncionarios();
    } else if (i == 2) {
      this.baixarRelatorioPedidos();
    } else if (i == 3) {
      this.baixarRelatorioProdutos();
    } else if (i == 4) {
      this.baixarRelatorioProdutosEmEstoqueBaixo();
    } else if (i == 5) {
      this.baixarRelatorioServico();
    }
  }

  baixarRelatorioFuncionarios() {
    this.funcionarioService
      .gerarRelatorioDeFuncionario()
      .subscribe((success) =>
        this.downloadRelatorioService.baixaRelatorio(success, 'Funcionario.pdf')
      );
    this.i = 0;
    this.dataRequestAtiva = false;
  }

  baixarRelatorioPedidos() {
    this.pedidosService
      .gerarRelatorioDePedido(this.dataRequest)
      .subscribe((success) =>
        this.downloadRelatorioService.baixaRelatorio(success, 'Pedidos.pdf')
      );
    this.i = 0;
    this.dataRequestAtiva = false;
  }

  baixarRelatorioProdutos() {
    this.produtosService
      .gerarRelatorioDeProduto()
      .subscribe((success) =>
        this.downloadRelatorioService.baixaRelatorio(success, 'Produtos.pdf')
      );
  }

  baixarRelatorioProdutosEmEstoqueBaixo() {
    this.produtosService
      .gerarRelatorioDeProdutoComEstoqueBaixo()
      .subscribe((success) =>
        this.downloadRelatorioService.baixaRelatorio(
          success,
          'ProdutosEmEstoqueBaixo.pdf'
        )
      );
  }

  baixarRelatorioServico() {
    this.servicosService
      .gerarRelatorioDeServico()
      .subscribe((success) =>
        this.downloadRelatorioService.baixaRelatorio(success, 'Servicos.pdf')
      );
  }
}
