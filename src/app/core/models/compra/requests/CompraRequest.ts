import { CompraProdutoRequest } from './CompraProdutoRequest';

export interface CompraRequest {
  fornecedor: string;
  valorTotal: string;
  listaDeProdutos: CompraProdutoRequest[];
}
