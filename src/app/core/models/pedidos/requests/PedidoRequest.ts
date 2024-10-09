import { PedidoServicoRequest } from './PedidoServicoRequest';

export class PedidoRequest {
  valorTotal!: string;
  cliente!: string;
  listaDeServicos: PedidoServicoRequest[] = [];
}
