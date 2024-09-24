import { Resposta } from '../../enums/Resposta';
import { Status } from '../../enums/Status';

export interface ClienteResponse {
  nome: string;
  cpf: string;
  celular: string;
  email: string;
  desejaSerNotificado: Resposta;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
    complemento: string;
  };
}
