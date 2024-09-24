import { EnderecoResponse } from '../../enderecos/responses/EnderecoResponse';
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
  enderecoResponse: EnderecoResponse;
}
