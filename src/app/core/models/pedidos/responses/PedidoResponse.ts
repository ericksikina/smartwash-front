import { StatusPedido } from '../../enums/StatusPedido';
import { PagamentoResponse } from '../../pagamentos/responses/PagamentoResponse';
import { PedidoDetalheResponse } from './PedidoDetalheResponse';

export interface PedidoResponse {
  id: string;
  dataHora: string;
  valorTotal: string;
  status: StatusPedido;
  funcionario: string;
  cliente: string;
  pagamento: PagamentoResponse;
  listaDeServico: PedidoDetalheResponse[];
}
