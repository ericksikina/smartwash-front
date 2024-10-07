import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../api';
import { EnderecoViaCepResponse } from '../../models/enderecos/responses/EnderecoViaCepResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  APIEndereco: string = `${API}/endereco`;

  constructor(private http: HttpClient) {}

  buscarDadosDeEnderecoPeloCep(
    cep: string
  ): Observable<EnderecoViaCepResponse> {
    return this.http.get<EnderecoViaCepResponse>(
      `${this.APIEndereco}/buscar-dados-endereco/${cep}`
    );
  }
}
