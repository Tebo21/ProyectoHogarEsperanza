import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actividades } from '../models/Actividades';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  private _http = 'http://localhost:3000/actividadPersona';

  constructor(private http: HttpClient ) {}

  createActividad(Actividades:any) {
    return this.http.post<any>(this._http,Actividades);
  }
}
