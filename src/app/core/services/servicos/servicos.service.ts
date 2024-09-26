import { ServicoRequest } from './../../models/servicos/requests/ServicoRequest';
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
      `${this.APIServico}/listar/${status}`
    );
  }

  atualizarSituacaoServico(id: string): Observable<void> {
    return this.http.put<void>(
      `${this.APIServico}/atualizar-situacao/${id}`,
      null
    );
  }

  cadastrarServico(servicoRequest: ServicoRequest): Observable<void> {
    return this.http.post<void>(`${this.APIServico}/cadastrar`, servicoRequest);
  }

  atualizarServico(
    id: string,
    servicoRequest: ServicoRequest
  ): Observable<void> {
    return this.http.put<void>(
      `${this.APIServico}/atualizar/${id}`,
      servicoRequest
    );
  }

  gerarRelatorioDeServico(): Observable<Blob[]> {
    return this.http.get<Blob[]>(`${this.APIServico}/gerar-relatorio`, {
      responseType: 'blob' as 'json',
    });
  }
}
