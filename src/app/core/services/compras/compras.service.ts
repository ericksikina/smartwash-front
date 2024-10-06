import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../api';
import { CompraResponse } from '../../models/compra/responses/CompraResponse';
import { CompraRequest } from '../../models/compra/requests/CompraRequest';
import { CompraProdutoRequest } from '../../models/compra/requests/CompraProdutoRequest';

@Injectable({
  providedIn: 'root',
})
export class ComprasService {
  APICompra: string = `${API}/compra`;

  constructor(private http: HttpClient) {}

  buscarListaDeCompra(): Observable<Array<CompraResponse>> {
    return this.http.get<Array<CompraResponse>>(`${this.APICompra}/listar`);
  }

  cadastrarCompra(compraRequest: CompraRequest): Observable<void> {
    return this.http.post<void>(`${this.APICompra}/cadastrar`, compraRequest);
  }

  calcularValorTotalCompra(
    listaDeProdutos: Array<CompraProdutoRequest>
  ): Observable<string> {
    return this.http.post<string>(
      `${this.APICompra}/calcular-total`,
      listaDeProdutos
    );
  }
}
