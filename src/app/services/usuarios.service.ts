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
    const url = `http://192.168.0.199:3000/${query}?usuarioCedula=${usuarioCedula}&usuarioContrasenia=${usuarioContrasenia}&usuarioTipo=${usuarioTipo}`;
    return this.http.request<Usuarios>('get', url);
  }

  getLogin(usuarioCedula: string, usuarioContrasenia: string, usuarioTipo: number): Observable<any> {
    const url = 'login-usuario';
    return this.getQueryLogin(url, usuarioCedula, usuarioContrasenia, usuarioTipo);
  }

  QueryAddUser(query: String, usuario: Usuarios) {
    const url = `http://192.168.0.199:3000/${query}`;
    return this.http.request<Usuarios>('post', url, {
      body: usuario
    });
  }
  addUser(usuario: Usuarios): Observable<any> {
    const url = 'post-usuario';
    return this.QueryAddUser(url, usuario);
  }

  getAll(): Observable<any> {
    const url = `http://192.168.0.199:3000/getAll-usuario`;
    return this.http.get<Usuarios>(url);
  }

  QueryDeleteUser(query: String, idUsuario: number) {
    const url = `http://192.168.0.199:3000/${query}/${idUsuario}`;
    return this.http.request<Usuarios>('delete', url);
  }

  deleteUser(idUsuario: number): Observable<any> {
    const url = 'delete-usuario';
    return this.QueryDeleteUser(url, idUsuario);
  }

  QueryUpdateUser(query: String, usuario: Usuarios) {
    const url = `http://192.168.0.199:3000/${query}`;
    return this.http.request<Usuarios>('put', url, {
      body: usuario
    });
  }
  updateUser(usuario: Usuarios): Observable<any> {
    const url = 'update-usuario';
    return this.QueryUpdateUser(url, usuario);
  }

  //Traer Usuario Especifico
  getQueryUserByCedula(query: string, usuarioCedula: string): Observable<Usuarios> {
    const url = `http://192.168.0.199:3000/${query}?usuarioCedula=${usuarioCedula}`;
    return this.http.request<Usuarios>('get', url);
  }

  getUserByCedula(usuarioCedula: string): Observable<any> {
    const url = 'getUsuarioByCedula';
    return this.getQueryUserByCedula(url, usuarioCedula);
  }

}
