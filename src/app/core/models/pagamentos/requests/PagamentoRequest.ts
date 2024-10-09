import { TipoPagamento } from './../../enums/TipoPagamento';

export class PagamentoRequest {
  tipo?: TipoPagamento;
  constructor(pagamentoRequest?: any) {
    this.tipo = pagamentoRequest?.tipo.tipo;
  }
}
