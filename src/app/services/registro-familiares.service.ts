import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistroFamiliares } from '../models/registro-familiares';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroFamiliaresService {
  private URL='http://localhost:3000/registroFamiliares';
  constructor(private http:HttpClient) { }

 
  getfamicedula(cedula: any): Observable<any>{
    return this.http.get<any>(this.URL+`/bycedula/${cedula}`);
  }
  getFami():Observable<any>{
    return this.http.get(`${this.URL}/listadoRegistroFamiliares`)
  }

  //Post Registro
  QueryAddRegistro(query: String, registro: RegistroFamiliares) {
    const url = `http://localhost:3000/registroFamiliares/${query}`;
    return this.http.request<RegistroFamiliares>('post', url, {
      body: registro
    });
  }
  postRegistFami(registro: RegistroFamiliares): Observable<any> {
    const url = 'addfamiliares';
    return this.QueryAddRegistro(url, registro);
  }

  //Actualizar Fichas
  getQueryUpdateFamiliares(query: String, registro: RegistroFamiliares) {
    const url = `http://localhost:3000/registroFamiliares/${query}`;
    return this.http.request<RegistroFamiliares>('put', url, {
      body: registro
    });
  }
  updateFamiliares(registro: RegistroFamiliares): Observable<any> {
    const url = 'update-ficha';
    return this.getQueryUpdateFamiliares(url, registro);
  }

   //Traer Registro familiar Especifico por numero de cedula del beneficiario
   getQueryFamByCedula(query: string, cedulaPersona: string): Observable<RegistroFamiliares> {
    const url = `http://localhost:3000/registroFamiliares/${query}?cedulaPersona=${cedulaPersona}`;
    return this.http.request<RegistroFamiliares>('get', url);
  }

  getFamByCedula(cedulaPersona: string): Observable<any> {
    const url = 'getByCedula';
    return this.getQueryFamByCedula(url, cedulaPersona);
  }

  //Eliminar Familiares
  QueryDeleteRegistro(query: String, cedulaPersona: string) {
    const url = `http://localhost:3000/registroFamiliares/${query}/${cedulaPersona}`;
    return this.http.request<RegistroFamiliares>('delete', url);
  }

  deleteRegistro(cedulaPersona: string): Observable<any> {
    const url = 'delete-familiar';
    return this.QueryDeleteRegistro(url, cedulaPersona);
  }

  QueryDeleteRegistroById(query: String, idRegistroFamiliares: number) {
    const url = `http://localhost:3000/registroFamiliares/${query}/${idRegistroFamiliares}`;
    return this.http.request<RegistroFamiliares>('delete', url);
  }

  deleteRegistroById(idRegistroFamiliares: number): Observable<any> {
    const url = 'delete-familiarByiD';
    return this.QueryDeleteRegistroById(url, idRegistroFamiliares);
  }
}
