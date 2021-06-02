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
<<<<<<< HEAD
  getQueryLogin(query: string, nombreUsuario: string, contrasenia: string): Observable<Usuarios> {
    const url = `http://localhost:8080/usuario/${query}?nombreUsuario=${nombreUsuario}&contrasenia=${contrasenia}`;
=======
  getQueryLogin(query: string, usuarioCedula: string, usuarioContrasenia: string, usuarioTipo: number): Observable<Usuarios> {
    const url = `http://localhost:3000/usuario/${query}?usuarioCedula=${usuarioCedula}&usuarioContrasenia=${usuarioContrasenia}&usuarioTipo=${usuarioTipo}`;
>>>>>>> 52c41e70767c7a2b183a2b4ac8469b1e4808d3cd
    return this.http.get<Usuarios>(url);
  }

  getLogin(usuarioCedula: string, usuarioContrasenia: string, usuarioTipo: number): Observable<any> {
    const url = 'login';
    return this.getQueryLogin(url, usuarioCedula, usuarioContrasenia, usuarioTipo);
  }

}
