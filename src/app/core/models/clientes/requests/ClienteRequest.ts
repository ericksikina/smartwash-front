import { EnderecoRequest } from '../../enderecos/requests/EnderecoRequest';
import { Resposta } from '../../enums/Resposta';

export interface ClienteResponse {
  nome: string;
  cpf: string;
  celular: string;
  email: string;
  desejaSerNotificado: Resposta;
  endereco: EnderecoRequest;
}
