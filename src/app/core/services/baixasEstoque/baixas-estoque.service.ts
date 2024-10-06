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

  // Cadastrar baixa de estoque
  cadastrarBaixa(baixaEstoqueRequest: BaixaEstoqueRequest): Observable<void> {
    return this.http.post<void>(
      `${this.APIBaixoEstoque}/cadastrar`,
      baixaEstoqueRequest
    );
  }

  // Buscar lista de produtos em baixo estoque
  buscarListaDeProdutosEstoqueBaixo(): Observable<Array<BaixaEstoqueResponse>> {
    return this.http.get<Array<BaixaEstoqueResponse>>(
      `${this.APIBaixoEstoque}/listar`
    );
  }

  // Buscar lista de baixa de estoque filtrada por data
  buscarListaDeBaixaEstoqueFiltradoPorData(
    dataRequest: DataRequest
  ): Observable<Array<BaixaEstoqueResponse>> {
    return this.http.post<Array<BaixaEstoqueResponse>>(
      `${this.APIBaixoEstoque}/filtrar-por-data`,
      dataRequest
    );
  }
}
