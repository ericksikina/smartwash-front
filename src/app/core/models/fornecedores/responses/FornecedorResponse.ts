import { Status } from '../../enums/Status';

export interface FornecedorResponse {
  id: string;
  descricao: string;
  telefone: string;
  cnpj: string;
  status: Status;
}
