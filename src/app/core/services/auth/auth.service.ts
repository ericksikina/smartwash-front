import { Observable } from 'rxjs';
import { RegisterRequest } from './../../models/auth/requests/RegisterRequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../api';
import { LoginResponse } from '../../models/auth/responses/LoginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  APIAuth: string = `${API}/auth`;

  constructor(private http: HttpClient) {}

  public login(registerRequest: RegisterRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.APIAuth}/login`,
      registerRequest
    );
  }
}
