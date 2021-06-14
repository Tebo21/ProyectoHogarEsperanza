import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Actividades } from '../models/Actividades';
import { TipoActividad } from '../models/TipoActividad';

@Injectable({
  providedIn: 'root',
})
export class ActividadesService {
  @Output() open: EventEmitter<any> = new EventEmitter();

  public actividades: Actividades[] = [];
  private _http = 'http://localhost:3000/actividadPersona';
  private _httpTipo = 'http://localhost:3000/tipoactividad';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<Actividades[]>(
      this._http + '/listadoActividadesPersona'
    );
  }
  createActividad(Actividades: any) {
    return this.http.post<any>(this._http+'/', Actividades);
  }
  getAllTipos(): Observable<any> {
    return this.http.get<TipoActividad[]>(this._httpTipo + '/listadoTipoAct');
  }
  getOneByNameTipo(nombreActividad: any): Observable<any> {
    return this.http.get<any>(this._httpTipo + `/bynombre/${nombreActividad}`);
  }

  createTipoAct(TipoActividad: any){
    return this.http.post<any>(this._httpTipo,TipoActividad);
  }

  getActividadCedulaAndFecha(fecha: any){
    return this.http.get<Actividades[]>(this._http+`/busquedaDiaria/${fecha}`)
  }

  trahsActi(id: number):Observable<any>{
    return this.http.delete(this._http+`/eliminar/${id}`)
  }
}
