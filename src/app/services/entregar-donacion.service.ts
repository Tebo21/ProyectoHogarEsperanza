import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntregaDonacion } from '../models/EntregaDonacion';

@Injectable({
  providedIn: 'root'
})
export class EntregarDonacionService {

  private URL = "http://192.168.0.171:3000/entregaDonacion/";  

  constructor(private http: HttpClient) { }

  getEntregas(){
    return this.http.get<EntregaDonacion[]>(this.URL+'lista');
  }

  postEntrega(entregaDonacion: EntregaDonacion){
    return this.http.post<EntregaDonacion>(this.URL+'?', entregaDonacion);
  }

  getPorId(idEntregaDonacion: number){
    return this.http.get<EntregaDonacion>(this.URL+idEntregaDonacion);
  }

  getPorCedula(cedulaBeneficiario: string){
    return this.http.get<EntregaDonacion[]>(this.URL+`byCedula/${cedulaBeneficiario}`);
  }

  updateEntrega(idEntregaDonacion: number, entregaDonacion: EntregaDonacion){
    return this.http.put<EntregaDonacion>(this.URL+`update/${idEntregaDonacion}`, entregaDonacion);    
  }

  deleteEntrega(idEntregaDonacion: number){
    return this.http.delete<boolean>(this.URL+`delete/${idEntregaDonacion}`);
  }
}
