import { TipoPagamento } from '../../enums/TipoPagamento';

export interface PagamentoResponse {
  dataPagamento: string;
  tipo: TipoPagamento;
}
