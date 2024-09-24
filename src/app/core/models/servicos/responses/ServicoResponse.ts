import { Status } from '../enums/Status';

export interface ServicoResponse {
  id: string;
  descricao: string;
  preco: string;
  status: Status;
}
