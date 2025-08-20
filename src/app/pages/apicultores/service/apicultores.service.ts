import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { enviroment, path } from "../../../../enviroment/environment";
import { Observable } from "rxjs";
import { Apicultor } from "../interface/apicultores.interface";
import { JwtService } from "../../../services/jwt.service";

@Injectable({
  providedIn: 'root'
})
export class ApicultoresService {
  private apiUrl = enviroment.apiUrl;
  private path = path.apiculrores;

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) { }



  getAllApicultores(): Observable<Apicultor[]> {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`
    });

    return this.http.get<Apicultor[]>(`${this.apiUrl}${this.path}`, { headers });
  }

}


