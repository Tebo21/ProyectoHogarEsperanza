import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AsistenciaPersona } from '../models/asistenciapersona';

@Injectable({
  providedIn: 'root'
})
export class AsistenciapersonaService {
k
  constructor(private http: HttpClient) { }

  //Insertar Asistencia
  QueryAddAsistencia(query: String, asistencia: AsistenciaPersona) {
    const url = `http://localhost:3000/${query}`;
    return this.http.request<AsistenciaPersona>('post', url, {
      body: asistencia
    });
  }
  addAsitencia(asistencia: AsistenciaPersona): Observable<any> {
    const url = 'post-asistencia';
    return this.QueryAddAsistencia(url, asistencia);
  }

  //Listar Asistencias por numero de cedula
  getQueryAsistenciaByCedula(query: string, cedulaPersona: string): Observable<AsistenciaPersona> {
    const url = `http://localhost:3000/${query}?cedulaPersona=${cedulaPersona}`;
    return this.http.request<AsistenciaPersona>('get', url);
  }

  getAsistenciaByCedula(cedulaPersona: string): Observable<any> {
    const url = 'get-asistenciabycedula';
    return this.getQueryAsistenciaByCedula(url, cedulaPersona);
  }

  //Eliminar Usuario
  QueryDeleteAsistencia(query: String, idAsistencia: number) {
    const url = `http://localhost:3000/${query}/${idAsistencia}`;
    return this.http.request<AsistenciaPersona>('delete', url);
  }

  deleteAsistencia(idAsistencia: number): Observable<any> {
    const url = 'delete-asistencia';
    return this.QueryDeleteAsistencia(url, idAsistencia);
  }

  //Actualizar Usuario
  QueryUpdateAsistencia(query: String, asistencia: AsistenciaPersona) {
    const url = `http://localhost:3000/${query}`;
    return this.http.request<AsistenciaPersona>('put', url, {
      body: asistencia
    });
  }

  updateAsistencia(asistencia: AsistenciaPersona): Observable<any> {
    const url = 'update-asistencia';
    return this.QueryUpdateAsistencia(url, asistencia);
  }

}
