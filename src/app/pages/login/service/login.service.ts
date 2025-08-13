// login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { enviroment } from '../../../../enviroment/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Login, ResponseAuth } from '../../../interface/auth/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = enviroment.apiUrl;

  constructor(private http: HttpClient) {}

login(credentials: Login): Observable<ResponseAuth> {
  return this.http.post<ResponseAuth>(`${this.apiUrl}auth/login`, credentials);
}
  
}



