import { Status } from '../../enums/Status';

export interface ProdutoResponse {
  id: string;
  descricao: string;
  quantidade: number;
  estoqueMinimo: number;
  status: Status;
}
