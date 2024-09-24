import { PedidoServicoRequest } from './PedidoServicoRequest';

export interface PedidoRequest {
  valorTotal: string;
  cliente: string;
  listaDeServicos: PedidoServicoRequest[];
}
