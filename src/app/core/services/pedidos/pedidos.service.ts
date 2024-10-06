import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../api';
import { PedidoRequest } from './../../models/pedidos/requests/PedidoRequest';
import { PedidoResponse } from './../../models/pedidos/responses/PedidoResponse';
import { DataRequest } from './../../models/utils/requests/DataRequest';
import { PagamentoRequest } from './../../models/pagamentos/requests/PagamentoRequest';
import { PedidoServicoRequest } from './../../models/pedidos/requests/PedidoServicoRequest';
import { StatusPedido } from './../../models/enums/StatusPedido';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  APIPedido: string = `${API}/pedido`;

  constructor(private http: HttpClient) {}

  buscarListaDePedidos(): Observable<Array<PedidoResponse>> {
    return this.http.get<Array<PedidoResponse>>(`${this.APIPedido}/listar`);
  }

  gerarRelatorioDePedido(dataRequest: DataRequest): Observable<Blob> {
    return this.http.post<Blob>(
      `${this.APIPedido}/gerar-relatorio`,
      dataRequest,
      { responseType: 'blob' as 'json' }
    );
  }

  cadastrarPedido(pedidoRequest: PedidoRequest): Observable<void> {
    return this.http.post<void>(`${this.APIPedido}/cadastrar`, pedidoRequest);
  }

  atualizarStatus(id: string, status: StatusPedido): Observable<void> {
    return this.http.put<void>(
      `${this.APIPedido}/atualizar-status/${id}/${status}`,
      null
    );
  }

  efetuarPagamento(id: string, pagamento: PagamentoRequest): Observable<void> {
    return this.http.put<void>(
      `${this.APIPedido}/efetuar-pagamento/${id}`,
      pagamento
    );
  }

  calcularValorTotal(
    listaDeServicos: Array<PedidoServicoRequest>
  ): Observable<String> {
    return this.http.post<String>(
      `${this.APIPedido}/calcular-total`,
      listaDeServicos
    );
  }

  notificarPedidoConcluido(idPedido: string): Observable<void> {
    return this.http.get<void>(`${this.APIPedido}/notificar/${idPedido}`);
  }
}
