import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CitasMedicas } from '../models/citas-medicas';

@Injectable({
  providedIn: 'root'
})
export class CitaMedicaService {

  url = 'http://localhost:3000/citasMedicas';

  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line: ban-types
  createCitas( centro: Object): Observable<Object>{
    return this.httpClient.post(`${this.url}/guardar`, centro);
  }


  listCitas(): Observable<any>{
    return this.httpClient.get(`${this.url}/listar`);
  }


  listCitasFechas(fecha: string): Observable<any>{
    return this.httpClient.get(`${this.url}/listadoId/${fecha}`);
  }


  deletCita( id: number): Observable<any>{
    return this.httpClient.delete(`${this.url}/eliminar/${id}`);
  }

  updateCita(id: number, cita: CitasMedicas): Observable<any>{
    return this.httpClient.put(`${this.url}/editar/${id}`, cita);
  }

  getPorNombre(nombre: any): Observable<CitasMedicas>{
    return this.httpClient.get<CitasMedicas>(`${this.url}/porNombre/${nombre}`);
  }

  getPorCedulaPa(cedula:any):Observable<any>{
    return this.httpClient.get<any>(this.url+`/bycedulapa/${cedula}`);
  }

  getPorCedulaAco(cedula: any): Observable<CitasMedicas>{
    return this.httpClient.get<CitasMedicas>(`${this.url}/bycedulaac/${cedula}`);
  }

  getPorCedulaTra(cedula: any): Observable<CitasMedicas>{
    return this.httpClient.get<CitasMedicas>(`${this.url}/bycedulatra/${cedula}`);
  }
}
