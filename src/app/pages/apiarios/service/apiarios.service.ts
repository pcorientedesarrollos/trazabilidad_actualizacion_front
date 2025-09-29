import { Injectable } from "@angular/core";
import { enviroment, path } from "../../../../enviroment/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtService } from "../../../services/jwt.service";
import { Observable } from "rxjs";
import { Apiarios } from "../interface/apiarios.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiariosService{
      private apiUrl = enviroment.apiUrl;
      private path = path;

        constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

   getApiario(): Observable<Apiarios[]>{
        const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`
    });

     return this.http.get<Apiarios[]>(`${this.apiUrl}${this.path.apiarios}`, { headers });
   }
}