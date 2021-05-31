import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentroMedicoService {
  private conexion = 'http://127.0.0.1:8080/centroMedico';

  constructor(private http: HttpClient){}

  // tslint:disable-next-line: ban-types
  createCentro( centro: Object): Observable<Object>{
    return this.http.post(`${this.conexion} + '/guardar'`, centro);
  }

  getCentro( id: number): Observable<any>{
    return this.http.get(`${this.conexion} +'/listado'/${id}`);
  }

  //getCentroList(): Observable<any>{
    //return this.http.get(`${this.conexion} +'/listado'`);
  //}
  
  listCentro(): Observable<any>{
    return this.http.get(`${this.conexion}/listado`)
  }

  // tslint:disable-next-line: ban-types
  updateCentro( id: number, value: any): Observable<Object>{
    return this.http.put(`${this.conexion} +'/editar'/${id}`, value);
  }

  

  deletCentro( id: number): Observable<any>{
    return this.http.delete(`${this.conexion} +'/eliminar'/${id}`, { responseType: 'text' });
  }
}