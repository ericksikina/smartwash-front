import { DataRequest } from './../../../core/models/utils/requests/DataRequest';
import { ServicoResponse } from './../../../core/models/servicos/responses/ServicoResponse';
import { ServicosService } from './../../../core/services/servicos/servicos.service';
import { PedidoRequest } from './../../../core/models/pedidos/requests/PedidoRequest';
import { PedidosService } from './../../../core/services/pedidos/pedidos.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DownloadRelatorioService } from '../../../core/services/utils/DownloadRelatorioService.service';
import { PedidoResponse } from '../../../core/models/pedidos/responses/PedidoResponse';
import { PedidoServicoRequest } from '../../../core/models/pedidos/requests/PedidoServicoRequest';
import { ClienteResponse } from '../../../core/models/clientes/responses/ClienteResponse';
import { ClientesService } from '../../../core/services/clientes/clientes.service';
import { PagamentoRequest } from '../../../core/models/pagamentos/requests/PagamentoRequest';
import { DropdownModule } from 'primeng/dropdown';
import { TipoPagamento } from '../../../core/models/enums/TipoPagamento';

@Component({
  selector: 'app-pedidos',
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
    DropdownModule,
  ],
  providers: [MessageService],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss',
})
export class PedidosComponent implements OnInit {
  itens: Array<MenuItem> = [];
  pedidos: Array<PedidoResponse> = [];

  pedidoRequest: PedidoRequest = new PedidoRequest();
  pedidoServicoRequest: PedidoServicoRequest = new PedidoServicoRequest();

  pagamentoRequest: PagamentoRequest = new PagamentoRequest();
  tipoPagamento: any = [
    { label: 'Pix', tipo: 'PIX' },
    { label: 'Credito', tipo: 'CREDITO' },
    { label: 'Debito', tipo: 'DEBITO' },
    { label: 'Em Especie', tipo: 'EM_ESPECIE' },
  ];

  servicoResponse: Array<ServicoResponse> = [];
  clienteResponse: Array<ClienteResponse> = [];

  pedidoSelecionado?: PedidoResponse;
  servicoSelecionado?: ServicoResponse;
  clienteSelecionado?: ClienteResponse;

  visibilidadeDataRequest: boolean = false;
  dataRequest: DataRequest = new DataRequest();

  visibilidadeDialogServico: boolean = false;
  visibilidadeDialogForm: boolean = false;
  visibilidadeDialogFormPagamento: boolean = false;

  constructor(
    private messageService: MessageService,
    private servicosService: ServicosService,
    private clienteService: ClientesService,
    private pedidosService: PedidosService,
    private downloadRelatorioService: DownloadRelatorioService
  ) {
    this.itens = [
      {
        label: 'Exibir dados',
        command: () => {
          this.showDialogServico();
        },
      },
    ];
  }

  ngOnInit(): void {
    this.buscarListaDePedidos();
  }

  acaoClique(pedido: any) {
    this.pedidoSelecionado = pedido;
  }

  buscarListaDePedidos() {
    this.pedidosService.buscarListaDePedidos().subscribe((success) => {
      this.pedidos = success;
    });
  }

  i = 0;
  gerarRelatorioDePedidos() {
    if (this.i % 2 == 1) {
      this.visibilidadeDataRequest = false;
      this.showToast('info', 'Carregando...', 'Aguarde alguns Segundos');
      this.pedidosService
        .gerarRelatorioDePedido(this.dataRequest)
        .subscribe((success) => {
          this.downloadRelatorioService.baixaRelatorio(success, 'Pedidos.pdf');
        });
    } else this.visibilidadeDataRequest = true;
    this.i++;
  }

  cadastrarPedido() {
    this.showToast('info', 'Cadastrando...', 'Aguarde alguns segundo!');
    if (this.clienteSelecionado) {
      this.pedidoRequest.cliente = this.clienteSelecionado!.id;
      this.pedidosService
        .cadastrarPedido(this.pedidoRequest)
        .subscribe((success) => {
          this.buscarListaDePedidos();
          this.visibilidadeDialogForm = false;
          this.showToast('success', 'Cadastrado com sucesso!');
        });
    } else {
      this.clearToast();
      this.showToast('error', 'CLIENTE NÃO REGISTRADO!');
    }
  }

  atualizarStatus(id: string) {
    this.showToast('info', 'Atualizando...', 'Aguarde alguns segundo!');
    this.pedidosService.atualizarStatus(id, 'PRONTO').subscribe((success) => {
      this.pedidosService.notificarPedidoConcluido(id).subscribe(() => {});
      this.buscarListaDePedidos();
      this.showToast('success', 'Atualizado com sucesso!');
    });
  }

  efetuarPagamento() {
    this.showToast('info', 'Efetuando Pagamento...');
    console.log(this.pagamentoRequest);
    this.pedidosService
      .efetuarPagamento(
        this.pedidoSelecionado!.id,
        new PagamentoRequest(this.pagamentoRequest)
      )
      .subscribe((success) => {
        this.pedidosService
          .atualizarStatus(this.pedidoSelecionado!.id, 'FINALIZADO')
          .subscribe((success) => {
            this.pedidosService
              .notificarPedidoConcluido(this.pedidoSelecionado!.id)
              .subscribe(() => {});
            this.buscarListaDePedidos();
            this.visibilidadeDialogFormPagamento = false;
            this.showToast('success', 'Pagamento Efetuado com sucesso!');
          });
      });
  }

  adicionarServico(): void {
    this.pedidoServicoRequest!.servico = this.servicoSelecionado!.id;
    this.pedidoRequest.listaDeServicos.push(this.pedidoServicoRequest!);
    this.pedidosService
      .calcularValorTotal(this.pedidoRequest.listaDeServicos)
      .subscribe((success) => (this.pedidoRequest.valorTotal = success));
    this.pedidoServicoRequest = new PedidoServicoRequest();
  }

  selecionarCliente(): void {
    this.clienteSelecionado = this.clienteResponse.filter(
      (p) => p.nome == this.pedidoRequest!.cliente
    )[0];
  }

  selecionarServico(): void {
    this.servicoSelecionado = this.servicoResponse.filter(
      (p) => p.descricao == this.pedidoServicoRequest!.servico
    )[0];
    console.log(this.servicoSelecionado);
  }

  removerServico(index: number): void {
    let i = -1;
    this.pedidoRequest.listaDeServicos =
      this.pedidoRequest.listaDeServicos.filter((p) => {
        i++;
        return i != index;
      });
    this.pedidoServicoRequest = new PedidoServicoRequest();
    this.pedidosService
      .calcularValorTotal(this.pedidoRequest.listaDeServicos)
      .subscribe((success) => (this.pedidoRequest.valorTotal = success));
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
    this.clienteService.buscarListaDeClientes('ATIVO').subscribe((success) => {
      this.clienteResponse = success;
      this.servicosService
        .buscarListaDeServicos('ATIVO')
        .subscribe((success) => {
          this.servicoResponse = success;
          this.pedidoRequest = new PedidoRequest();
          console.log(this.pedidoRequest);
          this.visibilidadeDialogForm = true;
        });
    });
  }

  showDialogServico() {
    this.visibilidadeDialogServico = true;
  }

  showDialogPagamento(pedido: PedidoResponse) {
    this.pagamentoRequest = new PagamentoRequest();
    this.pedidoSelecionado = pedido;
    this.visibilidadeDialogFormPagamento = true;
  }
}
