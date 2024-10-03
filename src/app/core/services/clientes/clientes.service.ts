import { ClienteRequest } from './../../models/clientes/requests/ClienteRequest';
import { Status } from './../../models/enums/Status';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../api';
import { Observable } from 'rxjs';
import { ClienteResponse } from '../../models/clientes/responses/ClienteResponse';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  APICliente: string = `${API}/cliente`;

  constructor(private http: HttpClient) {}

  buscarListaDeClientes(status: Status): Observable<Array<ClienteResponse>> {
    return this.http.get<Array<ClienteResponse>>(
      `${this.APICliente}/listar/${status}`
    );
  }

  cadastrarCliente(clienteRequest: ClienteRequest): Observable<void> {
    return this.http.post<void>(`${this.APICliente}/cadastrar`, clienteRequest);
  }

  atualizarCliente(
    id: string,
    clienteRequest: ClienteRequest
  ): Observable<void> {
    return this.http.put<void>(
      `${this.APICliente}/atualizar/${id}`,
      clienteRequest
    );
  }

  atualizarSituacaoCliente(id: string): Observable<void> {
    return this.http.put<void>(
      `${this.APICliente}/atualizar-situacao/${id}`,
      null
    );
  }
}
