import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../api';
import { FornecedorRequest } from './../../models/fornecedores/requests/FornecedorRequest';
import { FornecedorResponse } from './../../models/fornecedores/responses/FornecedorResponse';
import { Status } from './../../models/enums/Status';

@Injectable({
  providedIn: 'root',
})
export class FornecedoresService {
  APIFornecedor: string = `${API}/fornecedor`;

  constructor(private http: HttpClient) {}

  buscarListaDeFornecedores(
    status: Status
  ): Observable<Array<FornecedorResponse>> {
    return this.http.get<Array<FornecedorResponse>>(
      `${this.APIFornecedor}/listar/${status}`
    );
  }

  cadastrarFornecedor(fornecedorRequest: FornecedorRequest): Observable<void> {
    return this.http.post<void>(
      `${this.APIFornecedor}/cadastrar`,
      fornecedorRequest
    );
  }

  atualizarFornecedor(
    id: string,
    fornecedorRequest: FornecedorRequest
  ): Observable<void> {
    return this.http.put<void>(
      `${this.APIFornecedor}/atualizar/${id}`,
      fornecedorRequest
    );
  }

  atualizarSituacaoFornecedor(id: string): Observable<void> {
    return this.http.put<void>(
      `${this.APIFornecedor}/atualizar-situacao/${id}`,
      null
    );
  }
}
