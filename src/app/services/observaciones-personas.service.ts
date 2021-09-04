import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ObservacionesPersonas } from '../models/observaciones-personas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservacionesPersonasService {
  private URL='http://192.168.0.171:3000/observacionesPersonas';
  constructor(private http:HttpClient) { }

  postObservacion(observacionesPersonas:ObservacionesPersonas):Observable<any>{
    return this.http.post(`${this.URL}/addobservacionesPersonas`,observacionesPersonas);
  }

  getBycedula(cedula:any):Observable<any>{
    return this.http.get<any>(this.URL+`/byCedulaObservaciones/${cedula}`);
  }
  getQueryUpdateObservaciones(query: String, observacion:ObservacionesPersonas){
    const url = `${this.URL}/${query}`;
    return this.http.request<ObservacionesPersonas>('put',url, {
      body: observacion
    });
  }
  updateFamiliares(observacion: ObservacionesPersonas):Observable<any>{
    const url = `update-Observaciones`;
    return this.getQueryUpdateObservaciones(url, observacion);
  }
}