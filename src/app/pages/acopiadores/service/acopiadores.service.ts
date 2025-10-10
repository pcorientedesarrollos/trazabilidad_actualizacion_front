import { Injectable } from "@angular/core";
import { enviroment, path } from "../../../../enviroment/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtService } from "../../../services/jwt.service";
import { AcopiadoresConApicultor } from "../interface/acopiadores.interface";
import { map, Observable } from "rxjs";
import { AsigAcopiador } from "../../apicultores/interface/asigAcopiador.interface";
import { Apicultor } from "../../apicultores/interface/apicultores.interface";
import { AcopiadoresConTotalApicultores } from "../interface/acopiadoresConTotalApiocultores.interface";
import { Response } from "../../../interface/response.interface";
import { Estados } from "../../../interface/estados.interface";

@Injectable({
  providedIn: 'root'
})

export class AcopiadoresService {
  private apiUrl = enviroment.apiUrl;
  private path = path;

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

  getAcopiadorConApicultor(): Observable<AcopiadoresConApicultor[]> {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`
    });

    return this.http.get<AcopiadoresConApicultor[]>(`${this.apiUrl}${this.path.acopiadores}/${this.path.acopiadorConApicultor}`, { headers });
  }

  getAllApicultores(): Observable<Apicultor[]> {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`
    });

    return this.http.get<Apicultor[]>(`${this.apiUrl}${this.path.apicultores}`, { headers });
  }




  getAcopiadorConTotalApicultores(): Observable<AcopiadoresConTotalApicultores[]> {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`
    });
    return this.http.get<AcopiadoresConTotalApicultores[]>(`${this.apiUrl}${path.acopiadores}/${this.path.acopiadorConTotalApicultores}`, { headers });
  }

  agregarAcopiador(data: any): Observable<any> {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`
    });

    return this.http.post<any>(
      `${this.apiUrl}${this.path.acopiadores}`,
      data,
      { headers }
    )

  }

  asignarApicultor(idApicultor: number, idProveedor: number): Observable<AsigAcopiador> {
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

  actualizarAcopiador(idAcopiador: number, data: any): Observable<any> {
    const token = this.jwtService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<any>(
      `${this.apiUrl}${this.path.acopiadores}/${idAcopiador}`,
      data,
      { headers }
    );
  }


  actualizarAcopiadorConTotalApicultor(idAcopiador: number, data: any): Observable<any> {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<any>(
      `${this.apiUrl}${this.path.acopiadores}/${path.acopiadorConTotalApicultor}/${idAcopiador}`,
      data,
      { headers }
    );
  }

  
  activarAcopiador(idAcopiador:number):Observable<Response>{
          const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<any>(
      `${this.apiUrl}${this.path.acopiadores}/${this.path.acopiadoresActivar}/${idAcopiador}`,
          {},
    { headers }
    )
  }

bajaAcopiador(idAcopiador: number): Observable<Response> {
  const token = this.jwtService.getToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token ?? ''}`,
    'Content-Type': 'application/json'
  });

  return this.http.delete<any>( 
    `${this.apiUrl}${this.path.acopiadores}/${this.path.acopiadorBaja}/${idAcopiador}`,
    { headers }
  );
}


  


}