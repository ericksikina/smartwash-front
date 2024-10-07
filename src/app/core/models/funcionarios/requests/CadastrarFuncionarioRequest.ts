import { RegisterRequest } from '../../auth/requests/RegisterRequest';
import { EnderecoRequest } from '../../enderecos/requests/EnderecoRequest';

export class CadastrarFuncionarioRequest {
  nome!: string;
  cpf!: string;
  celular!: string;
  salario!: string;
  dataContratacao!: Date;
  endereco: EnderecoRequest = new EnderecoRequest();
  auth: RegisterRequest = new RegisterRequest();
}
