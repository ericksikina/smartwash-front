import { EnderecoRequest } from '../../enderecos/requests/EnderecoRequest';

export class AtualizarFuncionarioRequest {
  nome!: string;
  cpf!: string;
  celular!: string;
  dataContratacao!: Date;
  endereco!: EnderecoRequest;
}
