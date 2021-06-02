import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Donaciones } from '../models/Donaciones';

@Injectable({
  providedIn: 'root'
})
export class DonaProductoService {

  private URL = "http://localhost:8080/donaciones/";

  constructor(private http: HttpClient) { }

  getDonaciones(): Observable<Donaciones[]>{
    return this.http.get<Donaciones[]>(this.URL+'listadoDonaciones');
  }

  postDonacionProd(donacion: Donaciones): Observable<Donaciones>{
    return this.http.post<Donaciones>(this.URL + '?', donacion);
  }

  deleteDonacionProd(idDonacion: any){
    return this.http.delete(this.URL+`delete/${idDonacion}`);
  }

  getDonacionesPorCateg(categoria: any){
    return this.http.get<Donaciones[]>(this.URL+`byCategoria/${categoria}`);
  }

}
