import { RegisterRequest } from '../../auth/requests/RegisterRequest';
import { EnderecoRequest } from '../../enderecos/requests/EnderecoRequest';

export interface CadastrarFuncionarioRequest {
  nome: string;
  cpf: string;
  celular: string;
  salario: string;
  dataContratacao: Date;
  endereco: EnderecoRequest;
  auth: RegisterRequest;
}
