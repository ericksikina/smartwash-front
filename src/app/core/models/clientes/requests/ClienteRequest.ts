import { EnderecoRequest } from '../../enderecos/requests/EnderecoRequest';
import { Resposta } from '../../enums/Resposta';

export class ClienteRequest {
  nome!: string;
  cpf!: string;
  celular!: string;
  email!: string;
  desejaSerNotificado!: Resposta;
  endereco!: EnderecoRequest;
}
