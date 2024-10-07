import { EnderecoViaCepResponse } from '../responses/EnderecoViaCepResponse';

export class EnderecoRequest {
  rua!: string;
  numero!: string;
  bairro!: string;
  cep!: string;
  cidade!: string;
  estado!: string;
  complemento?: string;

  converter(enderecoViaCepResponse: EnderecoViaCepResponse | any) {
    this.rua = enderecoViaCepResponse.rua;
    this.bairro = enderecoViaCepResponse.bairro;
    this.cep = enderecoViaCepResponse.cep;
    this.cidade = enderecoViaCepResponse.cidade;
    this.estado = enderecoViaCepResponse.estado;
    this.numero = enderecoViaCepResponse.numero;
    this.complemento = enderecoViaCepResponse.complemento;
  }
}
