import { Injectable } from "@angular/core";
import { enviroment, path } from "../../../../enviroment/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtService } from "../../../services/jwt.service";
import { AcopiadoresConApicultor } from "../interface/acopiadores.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AcopiadoresService{
          private apiUrl = enviroment.apiUrl;
          private path = path;

                  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

  getAcopiadorConApicultor(): Observable<AcopiadoresConApicultor[]>{
            const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`
    });

    return this.http.get<AcopiadoresConApicultor[]>(`${this.apiUrl}${this.path.acopiadorConApicultor}`, { headers });
  }
}