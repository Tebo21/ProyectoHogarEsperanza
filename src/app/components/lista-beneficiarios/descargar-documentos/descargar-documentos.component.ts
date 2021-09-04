import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { saveAs } from 'file-saver';
import { DocumentosBeneficiarios } from '../../../models/documentos-beneficiarios';
import { DocumentosService } from '../../../services/documentos.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpEventType, HttpResponse, HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-descargar-documentos',
  templateUrl: './descargar-documentos.component.html',
  styleUrls: ['./descargar-documentos.component.css']
})
export class DescargarDocumentosComponent implements OnInit {
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  arrayDoc:any=[];
  linkDescarga:any;
  documentomodel:DocumentosBeneficiarios = new  DocumentosBeneficiarios();
  cedula_persona:string = localStorage.getItem('cedulalocalstorage');
  constructor(private documentoserver:DocumentosService,private root:Router) {
   }
  ngOnInit(): void {
    this.cargarArray()
  }
  cargarArray(){
    this.documentoserver.getDocumentoPorCedula(this.cedula_persona).subscribe( data =>{
      this.documentomodel.docPersonasBeneficiarios=data.docPersonasBeneficiarios;
      for(let i in data.docPersonasBeneficiarios){
         this.arrayDoc.push(this.documentomodel.docPersonasBeneficiarios[i]);
      }
    })
  }
  onDownloadFile(filename: string): void {
    this.documentoserver.download(filename).subscribe(
      event => {
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch(httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!, 
                  {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
           saveAs(new Blob([httpEvent.body!], 
             { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
              httpEvent.headers.get('File-Name'));
        }
        this.fileStatus.status = 'done';
        break;
        default:
          break;
    }
  }
  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }
}