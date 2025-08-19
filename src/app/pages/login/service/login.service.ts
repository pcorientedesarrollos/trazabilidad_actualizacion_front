// login.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { enviroment, path } from '../../../../enviroment/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { data, Login, ResponseAuth } from '../interface/login.interface';
import { JwtService } from '../../../services/jwt.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = enviroment.apiUrl;
  private path = path.auth;
  private service = inject(JwtService);

  constructor(private http: HttpClient) {}

  login(credentials: Login): Observable<ResponseAuth> {
    return this.http.post<ResponseAuth>(`${this.apiUrl}${this.path}`, credentials).pipe(
      catchError((error: HttpErrorResponse) => {
        const err: ResponseAuth = {
          error: error.error,
          status: error.status,
          message: error.message,
          data: {
            IdUsuarioTra: 0,
            Usuario: '',
            Token: ''
          }
        }
        return throwError(() => err);
      })
    ).pipe(
      map((response: ResponseAuth) => {
        this.service.setToken(response.data.Token, response.data.Usuario);
        return response;
      })
    )
  }

}



