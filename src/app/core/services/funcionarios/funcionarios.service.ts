import { AtualizarFuncionarioRequest } from './../../models/funcionarios/requests/AtualizarFuncionarioRequest';
import { CadastrarFuncionarioRequest } from './../../models/funcionarios/requests/CadastrarFuncionarioRequest';
import { HttpClient } from '@angular/common/http';
import { API } from '../api';
import { Status } from '../../models/enums/Status';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FuncionarioResponse } from '../../models/funcionarios/responses/FuncionarioResponse';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  APIFuncionario: string = `${API}/funcionario`;

  constructor(private http: HttpClient) {}

  // Buscar lista de produtos por status
  buscarListaDeFuncionarios(
    status: Status
  ): Observable<Array<FuncionarioResponse>> {
    return this.http.get<Array<FuncionarioResponse>>(
      `${this.APIFuncionario}/listar/${status}`
    );
  }

  atualizarSituacaoFuncionario(id: string): Observable<void> {
    return this.http.put<void>(
      `${this.APIFuncionario}/atualizar-situacao/${id}`,
      null
    );
  }

  cadastraFuncionario(
    cadastrarFuncionarioRequest: CadastrarFuncionarioRequest
  ): Observable<void> {
    return this.http.post<void>(
      `${this.APIFuncionario}/cadastrar`,
      cadastrarFuncionarioRequest
    );
  }

  atualizarFuncionario(
    id: string,
    atualizarFuncionarioRequest: AtualizarFuncionarioRequest
  ): Observable<void> {
    return this.http.put<void>(
      `${this.APIFuncionario}/atualizar/${id}`,
      atualizarFuncionarioRequest
    );
  }

  gerarRelatorioDeFuncionario(): Observable<Blob[]> {
    return this.http.get<Blob[]>(`${this.APIFuncionario}/gerar-relatorio`, {
      responseType: 'blob' as 'json',
    });
  }
}
