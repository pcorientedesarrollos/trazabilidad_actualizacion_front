import { Injectable } from "@angular/core";
import { Estados } from "../interface/estados.interface";
import { enviroment, path } from "../../enviroment/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtService } from "./jwt.service";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class EstadosService{

      private apiUrl = enviroment.apiUrl;
  private path = path;

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) { }
    
    getEstados():Observable<Estados[]>{
            const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`
    });
    return this.http.get<Estados[]>(`${this.apiUrl}${this.path.ubicaciones}/${path.estados}`, {headers})

}

}