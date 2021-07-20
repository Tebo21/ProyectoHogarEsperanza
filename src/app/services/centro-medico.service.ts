import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CentroMedico } from '../models/centro-medico';

@Injectable({
  providedIn: 'root'
})
export class CentroMedicoService {
  private conexion = 'http://ec2-18-222-23-30.us-east-2.compute.amazonaws.com:3000/centroMedico';

  constructor(private http: HttpClient){}

  // tslint:disable-next-line: ban-types
  createCentro(centro: CentroMedico): Observable<any>{
    return this.http.post(`${this.conexion}/guardar`, centro);
  }

  listCentro(): Observable<any>{
    return this.http.get(`${this.conexion}/listado`);
  }

  // tslint:disable-next-line: ban-types
  updateCentro(id: number, centro: CentroMedico): Observable<any>{
    return this.http.put(`${this.conexion}/editar/${id}`, centro);
  }

  deletCentro(id: number): Observable<any>{
    return this.http.delete(`${this.conexion}/eliminar/${id}`, { responseType: 'text' });
  }

}
