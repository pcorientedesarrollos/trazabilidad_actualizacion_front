import { Injectable } from "@angular/core";
import { enviroment, path } from "../../../../enviroment/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtService } from "../../../services/jwt.service";
import { Observable } from "rxjs";
import { DashBoard } from "../interface/dashboard.interface";

@Injectable({
  providedIn: 'root'
})

export class dashBoardService{
          private apiUrl = enviroment.apiUrl;
      private path = path;

        constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

  
  getDashBoard():Observable<DashBoard[]>{
       const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`
    });

    return this.http.get<DashBoard[]>(`${this.apiUrl}${this.path.dashboard}`, { headers });
  }

}