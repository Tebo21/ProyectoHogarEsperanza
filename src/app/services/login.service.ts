import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuarios } from '../models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  //Logear Usuario
  getQueryLogin(query: string, usuarioCedula: string, usuarioContrasenia: string, usuarioTipo: number): Observable<Usuarios> {
    const url = `http://localhost:3000/usuario/${query}?usuarioCedula=${usuarioCedula}&usuarioContrasenia=${usuarioContrasenia}&usuarioTipo=${usuarioTipo}`;
    return this.http.get<Usuarios>(url);
  }

  getLogin(usuarioCedula: string, usuarioContrasenia: string, usuarioTipo: number): Observable<any> {
    const url = 'login';
    return this.getQueryLogin(url, usuarioCedula, usuarioContrasenia, usuarioTipo);
  }
  
}
