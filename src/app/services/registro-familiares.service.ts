import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistroFamiliares } from '../models/registro-familiares';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroFamiliaresService {
  private URL='http://http://ec2-18-222-23-30.us-east-2.compute.amazonaws.com:3000/registroFamiliares';
  //private URL='http://http://ec2-18-222-23-30.us-east-2.compute.amazonaws.com:8080/registroFamiliares';
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
  getQueryUpdateFamiliares(query: String, familia:RegistroFamiliares){
    const url = `${this.URL}/${query}`;
    return this.http.request<RegistroFamiliares>('put',url, {
      body: familia
    });
  }

  updateFamiliares(familia: RegistroFamiliares):Observable<any>{
    const url = `update-familiares`;
    return this.getQueryUpdateFamiliares(url, familia);
  }
}
