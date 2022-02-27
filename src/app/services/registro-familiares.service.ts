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

  postRegistFami(familiaresPersona:RegistroFamiliares):Observable<any>{
    return this.http.post(`${this.URL}/addfamiliares`,familiaresPersona);
  }
  getfamicedula(cedula: any): Observable<any>{
    return this.http.get<any>(this.URL+`/bycedula/${cedula}`);
  }
  getFami():Observable<any>{
    return this.http.get(`${this.URL}/listadoRegistroFamiliares`)
  }
  getQueryUpdateFamiliares(query: String, familia:any){
    const url = `${this.URL}/${query}`;
    return this.http.request<any>('put',url, {
      body: familia
    });
  }

  updateFamiliares(familia: any):Observable<any>{
    const url = `update-familiares`;
    return this.getQueryUpdateFamiliares(url, familia);
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
}
