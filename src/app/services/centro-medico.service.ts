import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentroMedicoService {
  private conexion = 'http://localhost:9898/centroMedico';

  constructor(private http: HttpClient){}

  // tslint:disable-next-line: ban-types
  createCentro( centro: Object): Observable<Object>{
    return this.http.post(`${this.conexion} + '/guardarCentroMedico'`, centro);
  }

  getCentro( id: number): Observable<any>{
    return this.http.get(`${this.conexion} +'/listadoCentroMedicoId'/${id}`);
  }

  // tslint:disable-next-line: ban-types
  updateCentro( id: number, value: any): Observable<Object>{
    return this.http.put(`${this.conexion} +'/editarCentroMedico'/${id}`, value);
  }

  getCentroList(): Observable<any>{
    return this.http.get(`${this.conexion} +'/listadoCentroMedico'`);
  }

  deletCentro( id: number): Observable<any>{
    return this.http.delete(`${this.conexion} +'/eliminarCentroMedico'/${id}`, { responseType: 'text' });
  }
}