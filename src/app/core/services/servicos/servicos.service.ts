import { Status } from './../../models/enums/Status';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../api';
import { Observable } from 'rxjs';
import { ServicoResponse } from '../../models/servicos/responses/ServicoResponse';

@Injectable({
  providedIn: 'root',
})
export class ServicosService {
  APIServico: string = `${API}/servico`;

  constructor(private http: HttpClient) {}

  buscarListaDeServicos(status: Status): Observable<Array<ServicoResponse>> {
    return this.http.get<Array<ServicoResponse>>(
      `${this.APIServico}/listar/${status}`,
      { headers: { Authorization: localStorage.getItem('token')! } }
    );
  }

  atualizarSituacaoServico(id: string): Observable<void> {
    return this.http.put<void>(
      `${this.APIServico}/atualizar-situacao/${id}`,
      null,
      {
        headers: { Authorization: localStorage.getItem('token')! },
      }
    );
  }
}
