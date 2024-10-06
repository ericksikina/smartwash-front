import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../api';
import { Status } from '../../models/enums/Status';
import { ProdutoResponse } from '../../models/produtos/responses/ProdutoResponse';
import { CadastrarProdutoRequest } from '../../models/produtos/requests/CadastrarProdutoRequest';
import { AtualizarProdutoRequest } from '../../models/produtos/requests/AtualizarProdutoRequest';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  APIProduto: string = `${API}/produto`;

  constructor(private http: HttpClient) {}

  // Buscar lista de produtos por status
  buscarListaDeProdutos(status: Status): Observable<Array<ProdutoResponse>> {
    return this.http.get<Array<ProdutoResponse>>(
      `${this.APIProduto}/listar/${status}`
    );
  }

  // Atualizar situação do produto por ID
  atualizarSituacaoProduto(id: string): Observable<void> {
    return this.http.put<void>(
      `${this.APIProduto}/atualizar-situacao/${id}`,
      null
    );
  }

  // Cadastrar novo produto
  cadastrarProduto(produtoRequest: CadastrarProdutoRequest): Observable<void> {
    return this.http.post<void>(`${this.APIProduto}/cadastrar`, produtoRequest);
  }

  // Atualizar um produto existente por ID
  atualizarProduto(
    id: string,
    produtoRequest: AtualizarProdutoRequest
  ): Observable<void> {
    return this.http.put<void>(
      `${this.APIProduto}/atualizar/${id}`,
      produtoRequest
    );
  }

  // Gerar relatório de produtos
  gerarRelatorioDeProduto(): Observable<Blob[]> {
    return this.http.get<Blob[]>(`${this.APIProduto}/gerar-relatorio`, {
      responseType: 'blob' as 'json',
    });
  }

  // Gerar relatório de produtos com estoque baixo
  gerarRelatorioDeProdutoComEstoqueBaixo(): Observable<Blob[]> {
    return this.http.get<Blob[]>(
      `${this.APIProduto}/gerar-relatorio-estoque-baixo`,
      {
        responseType: 'blob' as 'json',
      }
    );
  }
}
