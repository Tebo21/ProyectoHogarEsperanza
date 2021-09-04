import { Injectable } from '@angular/core';
import { DocumentosBeneficiarios } from '../models/documentos-beneficiarios';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { S3 } from 'aws-sdk';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  private URL='http://ec2-18-222-23-30.us-east-2.compute.amazonaws.com:3000/documentosBeneficiarios';
  constructor(private http:HttpClient) { }
  postRegostroDocumentos(documentos:DocumentosBeneficiarios):Observable<any>{
    return this.http.post(`${this.URL}/addDocumentos`,documentos);
  }
  getDocumentoPorCedula(cedula:any):Observable<any>{
    return this.http.get(this.URL+`/listadoporcedula/${cedula}`);  
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
}
