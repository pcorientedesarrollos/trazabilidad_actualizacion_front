import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { enviroment, path } from "../../../../enviroment/environment";
import { map, Observable } from "rxjs";
import { Apicultor } from "../interface/apicultores.interface";
import { JwtService } from "../../../services/jwt.service";
import { Response } from "../../../interface/response.interface";

@Injectable({
  providedIn: 'root'
})
export class ApicultoresService {
  private apiUrl = enviroment.apiUrl;
  private path = path;

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) { }



  getAllApicultores(): Observable<Apicultor[]> {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`
    });

    return this.http.get<Apicultor[]>(`${this.apiUrl}${this.path.apiculrores}`, { headers });
  }

bajaApicultores(id: number): Observable<Response> {
  const token = this.jwtService.getToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token ?? ''}`
  });

  return this.http.delete<Response[]>(`${this.apiUrl}${this.path.apicultoresBaja}/${id}`, { headers }).pipe(
    map(res => res[0])

  );
}

activarApicultores(idApicultor: number): Observable<Response> {
  const token = this.jwtService.getToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token ?? ''}`
  });

  return this.http.put<Response[]>(
    `${this.apiUrl}${this.path.apicultoresActivar}/${idApicultor}`,
    {},
    { headers }
  ).pipe(
    map(res => res[0]) 
  );
}



}



