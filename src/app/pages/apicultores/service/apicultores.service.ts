import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { enviroment, path } from "../../../../enviroment/environment";
import { map, Observable } from "rxjs";
import { Apicultor } from "../interface/apicultores.interface";
import { JwtService } from "../../../services/jwt.service";
import { Response } from "../../../interface/response.interface";
import { Acopiador } from "../interface/acopiadores.interface";
import { AsigAcopiador } from "../interface/asigAcopiador.interface";

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

    return this.http.get<Apicultor[]>(`${this.apiUrl}${this.path.apicultores}`, { headers });
  }

  getAllAcopiadores():Observable<Acopiador[]>{
     const token = this.jwtService.getToken();
      const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`
    });

    return this.http.get<Acopiador[]>(`${this.apiUrl}${this.path.acopiadores}`, { headers });

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
agregarApicultor(apicultorData: any): Observable<any> {
  const token = this.jwtService.getToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token ?? ''}`
  });

  return this.http.post<any>(
    `${this.apiUrl}${this.path.addApicultor}`, 
    apicultorData,
    { headers }
  );
}

  asignarAcopiador(idApicultor: number,  idProveedor: number): Observable<AsigAcopiador> {
  const token = this.jwtService.getToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token ?? ''}`
  });

  const body = {
    idApicultor,
    idProveedor
  };

  return this.http.post<AsigAcopiador>(
    `${this.apiUrl}${this.path.asigAcopiadorApicultor}`,
    body,
    { headers }
  );
}

updateApicultor(idApicultor: number, data: any): Observable<any> {
  const token = this.jwtService.getToken();

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token ?? ''}`,
    'Content-Type': 'application/json'
  });

  return this.http.put<any>(
`${this.apiUrl}${this.path.apicultores.trim()}/${idApicultor}`, 
    data,
    { headers }
  );
}




}



