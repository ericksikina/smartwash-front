export interface CadastrarFuncionarioRequest {
  nome: string;
  cpf: string;
  celular: string;
  salario: string;
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
  auth: {
    login: string;
    password: string;
  };
}
