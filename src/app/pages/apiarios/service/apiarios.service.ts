import { Injectable } from "@angular/core";
import { enviroment, path } from "../../../../enviroment/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtService } from "../../../services/jwt.service";
import { Observable } from "rxjs";
import { Apiarios } from "../interface/apiarios.interface";
import { Apicultor } from "../../apicultores/interface/apicultores.interface";

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

    getAllApicultores(): Observable<Apicultor[]> {
       const token = this.jwtService.getToken();
       const headers = new HttpHeaders({
         Authorization: `Bearer ${token ?? ''}`
       });
   
       return this.http.get<Apicultor[]>(`${this.apiUrl}${this.path.apicultores}`, { headers });
     }
    agregarApiario(data: any) : Observable<any>{
        const token = this.jwtService.getToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token ?? ''}`
  });

      return this.http.post<any>(
              `${this.apiUrl}${this.path.apiarios}`, 
    data,
    { headers }
      );
    }

    actualizarApiario(id : number,data:any): Observable<any>{
              const token = this.jwtService.getToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token ?? ''}`
  });
    return this.http.put<any>(
      `${this.apiUrl}${this.path.apiarios}/${id}`, 
    data,
    { headers }
    )
    }    
}