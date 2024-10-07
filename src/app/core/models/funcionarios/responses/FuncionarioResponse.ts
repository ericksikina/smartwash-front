import { Status } from '../../enums/Status';

export interface FuncionarioResponse {
  id: string;
  nome: string;
  cpf: string;
  celular: string;
  salario: string;
  dataContratacao: Date;
  status: Status;
  enderecoResponse: {
    id: string;
    rua: string;
    numero: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
    complemento: string;
  };
}
