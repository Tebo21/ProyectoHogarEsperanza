import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Personas } from '../models/personas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private URL='http://http://ec2-18-222-23-30.us-east-2.compute.amazonaws.com:3000/persona';
  constructor(private http:HttpClient) { }

  postPersona(persona:Personas):Observable<any>{
    return this.http.post(`${this.URL}/crearPersona`,persona);
  }

  getPorCedula(cedula: any): Observable<Personas>{
    return this.http.get<Personas>(this.URL+`/bycedula/${cedula}`);
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
    const url = 'listadoBeneficiarios';
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

  //Buscar por Correo
  getQueryPersonByCorreo(query: string,correoPersona: string): Observable<Personas> {
    const url = `${this.URL}/${query}?correoPersona=${correoPersona}`;
    return this.http.request<Personas>('get', url);
  }

  getPorCorreo(correoPersona: string): Observable<any> {
    const url = 'listarPorCorreo';
    return this.getQueryPersonByCorreo(url,correoPersona);
  }
}
