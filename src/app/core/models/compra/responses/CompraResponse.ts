import { CompraDetalheResponse } from './CompraDetalheResponse';

export interface CompraResponse {
  valorTotal: string;
  dataHora: string;
  fornecedor: string;
  funcionario: string;
  listaDeCompra: CompraDetalheResponse[];
}
