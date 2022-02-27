import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Personas } from '../models/personas';
import { Observable } from 'rxjs';
import { Perregficdto } from '../models/perregficdto';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private URL='http://localhost:3000/persona';
  constructor(private http:HttpClient) { }

  postPersona(persona:Personas):Observable<any>{
    return this.http.post(`${this.URL}/crearPersona`,persona);
  }

  getPersona():Observable<any>{
    return this.http.get(`${this.URL}/listadoPersonas`);
  }

  //Traer Personas Beneficiarias o Voluntarias/Administrativas
  getQueryUserByEstadoYTipo(query: string,estadoActivo: boolean, beneficiario: boolean): Observable<Personas> {
    const url = `${this.URL}/${query}?estadoActivo=${estadoActivo}&beneficiario=${beneficiario}`;
    return this.http.request<Personas>('get', url);
  }

  getUserByEstadoYTipo(estadoActivo: boolean, beneficiario: boolean): Observable<any> {
    const url = 'listadoBeneficiariosActivos';
    return this.getQueryUserByEstadoYTipo(url,estadoActivo, beneficiario);
  }
  
  //Actualizar Persona
  getQueryUpdatePersona(query: String, persona: Personas ) {
    const url = `${this.URL}/${query}`;
    return this.http.request<Personas>('put',url, {
      body: persona
  });
  }

  updatePersona( persona: Personas): Observable<any> {
    const url = 'update-persona';
    return this.getQueryUpdatePersona(url,  persona);
  }

  //Buscar por numero de cedula
  getQueryUserByCedula(query: string, cedula: any): Observable<Personas>{
    const url = `http://localhost:3000/${query}?cedula=${cedula}`;
    return this.http.request<Personas>('get', url);
  }

  getUserByCedula(cedula: string): Observable<any> {
    const url = '/persona/getPersonaByCedula';
    return this.getQueryUserByCedula(url, cedula);
  }


  //Buscar por Correo
  getQueryPersonByCorreo(query: string,correoPersona: string): Observable<Personas> {
    const url = `http://localhost:3000/${query}?correoPersona=${correoPersona}`;
    return this.http.request<Personas>('get', url);
  }

  getPorCorreo(correoPersona: string): Observable<any> {
    const url = '/persona/listarPorCorreo';
    return this.getQueryPersonByCorreo(url,correoPersona);
  }

  //Traer toda la info de persona
  getAllInfo(query: string, cedula: string): Observable<Perregficdto> {
    const url = `http://localhost:3000/${query}?cedula=${cedula}`;
    return this.http.request<any>('get', url);
  }

  getAll(cedula: string): Observable<any> {
    const url = '/persona/getAllInfo';
    return this.getAllInfo(url,cedula);
  }
}
