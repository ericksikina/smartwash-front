import { EnderecoRequest } from '../../enderecos/requests/EnderecoRequest';

export interface AtualizarFuncionarioRequest {
  nome: string;
  cpf: string;
  celular: string;
  dataContratacao: Date;
  endereco: EnderecoRequest;
}
