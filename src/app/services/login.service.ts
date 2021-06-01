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
  getQueryLogin(query: string, nombreUsuario: string, contrasenia: string): Observable<Usuarios> {
    const url = `http://localhost:3000/usuario/${query}?nombreUsuario=${nombreUsuario}&contrasenia=${contrasenia}`;
    return this.http.get<Usuarios>(url);
  }

  getLogin(nombreUsuario: string, contrasenia: string): Observable<any> {
    const url = 'login';
    return this.getQueryLogin(url, nombreUsuario, contrasenia);
  }
}
