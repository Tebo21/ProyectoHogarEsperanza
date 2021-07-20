import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Especialidad } from '../models/especialidad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private conexion = 'http://ec2-18-222-23-30.us-east-2.compute.amazonaws.com:3000/especialidad';

  constructor(private http: HttpClient){}

  // tslint:disable-next-line: ban-types
  createEspecialidad(especialidad: Especialidad): Observable<any>{
    return this.http.post(`${this.conexion}/guardar`, especialidad);
  }

  listEspecialidad(): Observable<any>{
    return this.http.get(`${this.conexion}/listado`);
  }

  // tslint:disable-next-line: ban-types
  updateEspecialidad(id: number, especialidad: Especialidad): Observable<any>{
    return this.http.put(`${this.conexion}/editar/${id}`, especialidad);
  }

  deleteEspecialidad(id: number): Observable<any>{
    return this.http.delete(`${this.conexion}/eliminar/${id}`);
  }

}
