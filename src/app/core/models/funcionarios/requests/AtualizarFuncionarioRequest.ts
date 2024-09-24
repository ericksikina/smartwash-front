export interface AtualizarFuncionarioRequest {
  nome: string;
  cpf: string;
  celular: string;
  dataContratacao: string;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
    complemento: string;
  };
}
