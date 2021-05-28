import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Donaciones } from '../models/Donaciones';

@Injectable({
  providedIn: 'root'
})
export class DonaProductoService {

  private URL = "http://localhost:3000/donaciones/";

  constructor(private http: HttpClient) { }

  postDonacionProd(donacion: Donaciones): Observable<Donaciones>{
    return this.http.post<Donaciones>(this.URL + '?', donacion);
  }
}
