import { CompraProdutoRequest } from './CompraProdutoRequest';

export class CompraRequest {
  fornecedor!: string;
  valorTotal!: string;
  listaDeProdutos!: CompraProdutoRequest[];
}
