import { FuncionarioResponse } from './../responses/FuncionarioResponse';
import { EnderecoRequest } from '../../enderecos/requests/EnderecoRequest';

export class AtualizarFuncionarioRequest {
  nome!: string;
  cpf!: string;
  celular!: string;
  dataContratacao!: Date;
  endereco: EnderecoRequest = new EnderecoRequest();

  converter(funcionarioResponse: FuncionarioResponse) {
    this.nome = funcionarioResponse.nome;
    this.cpf = funcionarioResponse.cpf;
    this.celular = funcionarioResponse.celular;
    this.dataContratacao = new Date(funcionarioResponse.dataContratacao);
    this.dataContratacao.setDate(this.dataContratacao.getDate() + 1);
    this.endereco.converter(funcionarioResponse.enderecoResponse);
  }
}
