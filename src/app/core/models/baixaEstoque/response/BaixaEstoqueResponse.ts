import { BaixaEstoqueDetalheResponse } from './BaixaEstoqueDetalheResponse';

export interface BaixaEstoqueResponse {
  dataHora: string;
  funcionario: string;
  listaDeProdutos: BaixaEstoqueDetalheResponse[];
}
