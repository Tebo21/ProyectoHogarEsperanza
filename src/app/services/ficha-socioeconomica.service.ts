import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FichaSocioeconomica } from '../models/ficha-socioeconomica';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FichaSocioeconomicaService {
  private URL='http://localhost:8080/fichaSocioeconomica';
  constructor(private http:HttpClient) { }

  postFichaSocio(fichasocioeonomica:FichaSocioeconomica):Observable<any>{
    return this.http.post(`${this.URL}/addfichaSocioeconomica`,fichasocioeonomica);
  }
  getfichacedula(cedula: any): Observable<any>{
    return this.http.get<any>(this.URL+`/bycedula/${cedula}`);
  }
}
