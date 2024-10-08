import { EnderecoRequest } from '../../enderecos/requests/EnderecoRequest';
import { Resposta } from '../../enums/Resposta';
import { ClienteResponse } from '../responses/ClienteResponse';

export class ClienteRequest {
  nome!: string;
  cpf!: string;
  celular!: string;
  email!: string;
  desejaSerNotificado!: Resposta;
  endereco: EnderecoRequest = new EnderecoRequest();

  converter(clienteResponse: ClienteResponse) {
    this.nome = clienteResponse.nome;
    this.cpf = clienteResponse.cpf;
    this.celular = clienteResponse.celular;
    this.email = clienteResponse.email;
    this.desejaSerNotificado = clienteResponse.desejaSerNotificado;
    this.endereco.converter(clienteResponse.enderecoResponse);
  }
}
