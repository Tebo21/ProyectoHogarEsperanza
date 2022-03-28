import { Injectable } from '@angular/core';
import { DocumentosBeneficiarios } from '../models/documentos-beneficiarios';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  private URL='http://localhost:3000/documentosBeneficiarios';
  FOLDER = 'jsa-s3/';

  constructor(private http:HttpClient) { }
  postRegostroDocumentos(documentos:DocumentosBeneficiarios):Observable<any>{
    return this.http.post(`${this.URL}/addDocumentos`,documentos);
  } 
  getBycedula(cedulaPersona:string):Observable<any>{
    return this.http.get<any>(this.URL+`/porcedula/${cedulaPersona}`);
  }
  getDocumentos():Observable<any>{
    return this.http.get(`${this.URL}//listadoDocumentos`)
  }
  getQueryUpdateDocumentos(query:String, documentos:DocumentosBeneficiarios){
    const url = `${this.URL}/${query}`;
    return this.http.request<DocumentosBeneficiarios>('put',url,{
      body:documentos
    });
  }
  updateDocumentos(documentos:DocumentosBeneficiarios):Observable<any>{
    const url = `updateDocumentos`;
    return this.getQueryUpdateDocumentos(url, documentos);
  }
upload(formData: FormData): Observable<HttpEvent<string[]>> {
  return this.http.post<string[]>(`${this.URL}/upload`, formData, {
    reportProgress: true,
    observe: 'events'
  });
}
download(filename: string): Observable<HttpEvent<Blob>> {
  return this.http.get(`${this.URL}/download/${filename}/`, {
    reportProgress: true,
    observe: 'events',
    responseType: 'blob'
  });
}
delete(filename:string):Observable<any>{
  return this.http.delete<any>(this.URL+`/deletedoc/${filename}`);
}
deleteBase(idDocumentos: number):Observable<any>{
  return this.http.delete<any>(this.URL+`/delete-documento/${idDocumentos}`);
}
ver(filename:string):Observable<any>{
  return this.http.get<any>(this.URL+`/ver/${filename}`);
}
}
