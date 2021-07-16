import { Injectable } from '@angular/core';
import { DocumentosBeneficiarios } from '../models/documentos-beneficiarios';
import { HttpClient } from '@angular/common/http';
import { S3 } from 'aws-sdk';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  private URL='http://http://ec2-18-222-23-30.us-east-2.compute.amazonaws.com:3000/documentosBeneficiarios';
  FOLDER = 'jsa-s3/';

  constructor(private http:HttpClient) { }

  uploadfile(carpetaNombre,file){
   const bucket = new S3({
     accessKeyId: 'AKIAQHUFPVISBV7DEOEJ',
     secretAccessKey: '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',
     region: 'us-east-2'
   });

   const params = {
     Bucket: 'fundacionhogaresperanza',
     Key: carpetaNombre+'/'+ file.name,
     Body: file
   };
   
   bucket.upload(params, function (err, data){
     if(err){
       return false;
     }
     return true;
   });
  }
   dowloadedFile(carpeta,name){
    return 'https://fundacionhogaresperanza.s3.us-east-2.amazonaws.com/'+carpeta+'/'+name
   }
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
}
