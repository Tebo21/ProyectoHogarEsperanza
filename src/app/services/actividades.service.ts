import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actividades } from '../models/Actividades';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  public actividades: Actividades[] = [];
  private _http = 'http://localhost:3000/actividadPersona';

  constructor(private http: HttpClient ) {}

  getAll(): Observable<any> {
    return this.http.get<Actividades[]>(this._http + '/listadoActividadesPersona');

  }

  createActividad(Actividades:any) {
    return this.http.post<any>(this._http,Actividades);
  }
}
