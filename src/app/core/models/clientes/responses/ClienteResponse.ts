import { Resposta } from '../../enums/Resposta';
import { Status } from '../../enums/Status';

export interface ClienteResponse {
  id: string;
  nome: string;
  cpf: string;
  celular: string;
  email: string;
  desejaSerNotificado: Resposta;
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
