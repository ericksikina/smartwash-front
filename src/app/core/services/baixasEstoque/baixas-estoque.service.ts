import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../api';
import { BaixaEstoqueResponse } from '../../models/baixaEstoque/response/BaixaEstoqueResponse';
import { BaixaEstoqueRequest } from '../../models/baixaEstoque/request/BaixaEstoqueRequest';
import { DataRequest } from '../../models/utils/requests/DataRequest';

@Injectable({
  providedIn: 'root',
})
export class BaixaEstoqueService {
  APIBaixoEstoque: string = `${API}/baixa-estoque`;

  constructor(private http: HttpClient) {}

  cadastrarBaixa(baixaEstoqueRequest: BaixaEstoqueRequest): Observable<void> {
    return this.http.post<void>(
      `${this.APIBaixoEstoque}/cadastrar`,
      baixaEstoqueRequest
    );
  }

  buscarListaDeProdutosEstoqueBaixo(): Observable<Array<BaixaEstoqueResponse>> {
    return this.http.get<Array<BaixaEstoqueResponse>>(
      `${this.APIBaixoEstoque}/listar`
    );
  }

  buscarListaDeBaixaEstoqueFiltradoPorData(
    dataRequest: DataRequest
  ): Observable<Array<BaixaEstoqueResponse>> {
    return this.http.post<Array<BaixaEstoqueResponse>>(
      `${this.APIBaixoEstoque}/filtrar-por-data`,
      dataRequest
    );
  }
}
