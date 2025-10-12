import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Municipios, MunicipiosByIdEstado } from "../interface/municipios.interface";
import { enviroment, path } from "../../enviroment/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtService } from "./jwt.service";

@Injectable({
    providedIn : 'root'
})

export class MunicipiosService{
    
      private apiUrl = enviroment.apiUrl;
  private path = path;

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) { }
    
    getMunicipios():Observable<Municipios[]>{
        const token = this.jwtService.getToken();
           const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`
    });
    return this.http.get<Municipios[]>(`${this.apiUrl}${this.path.ubicaciones}/${this.path.Allmunicipios}`, {headers})
    }

    getMunicipiosByIdEstado(idEstado:number):Observable<MunicipiosByIdEstado[]>{
              const token = this.jwtService.getToken();
           const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`
    });

    return this.http.get<MunicipiosByIdEstado[]>(`${this.apiUrl}${this.path.ubicaciones}/${this.path.municipios}/${idEstado}`)

    }
}