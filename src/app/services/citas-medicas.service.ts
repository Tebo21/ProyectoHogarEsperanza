import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CitasMedicasService {

  private baseUrl = 'http://localhost:3000/citasMedicas';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: ban-types
  createCitaM(Class: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}+'/guardar'`, Class);
  }

  deleteCita(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}+'/eliminar'/${id}`, { responseType: 'text' });
  }


  getCistasM(): Observable<any> {
    return this.http.get(`${this.baseUrl}+'/listar'`);
  }
}
