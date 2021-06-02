import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuarios } from '../models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  //Logear Usuario
  getQueryLogin(query: string, usuarioCedula: string, usuarioContrasenia: string, usuarioTipo: number): Observable<Usuarios> {
    const url = `http://localhost:8080/${query}?usuarioCedula=${usuarioCedula}&usuarioContrasenia=${usuarioContrasenia}&usuarioTipo=${usuarioTipo}`;
    return this.http.request<Usuarios>('get', url);
  }

  getLogin(usuarioCedula: string, usuarioContrasenia: string, usuarioTipo: number): Observable<any> {
    const url = 'login-usuario';
    return this.getQueryLogin(url, usuarioCedula, usuarioContrasenia, usuarioTipo);
  }

  QueryAddUser(query: String, usuario: Usuarios ) {
    const url = `http://localhost:8080/${query}`;
    return this.http.request<Usuarios>('post',url, {
      body: usuario
  });
  }
  addUser(usuario: Usuarios): Observable<any> {
    const url = 'post-usuario';
    return this.QueryAddUser(url, usuario);
  }

  getAll(): Observable<any> {
    const url = `http://localhost:8080/getAll-usuario`;
    return this.http.get<Usuarios>(url);
  }



 
}
