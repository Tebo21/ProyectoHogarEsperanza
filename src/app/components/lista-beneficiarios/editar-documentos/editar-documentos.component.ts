import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentosBeneficiarios } from '../../../models/documentos-beneficiarios';
import { DocumentosService } from '../../../services/documentos.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-editar-documentos',
  templateUrl: './editar-documentos.component.html',
  styleUrls: ['./editar-documentos.component.css']
})
export class EditarDocumentosComponent implements OnInit {
  public archivos:any=[];
  public previsualizar:string;
  arrayLista:any=[];
  selectedFile: FileList; 
  tipoDocumento:String;
  nombreDoc:any;
  arrayLiStaNombres:any=[];
  documentomodel:DocumentosBeneficiarios = new  DocumentosBeneficiarios();
  cedula_persona:string = localStorage.getItem('cedulalocalstorage');
  valImg:any;
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  constructor(private sant:DomSanitizer,private documentoserver:DocumentosService,private root:Router) {
   }

  ngOnInit(): void {
    this.editarDocmentos(); 
}
reperarevent(event:any){
const files=event.target.files;
this.onUpload(files)
}
onUpload(files: File[]):void{
  const formData = new FormData();
  for(const file of files){
  formData.append('files',file,file.name);
}
  this.documentoserver.upload(formData).subscribe(event=>
    this.resportProgress(event),
  (error: HttpErrorResponse)=>console.log(error)
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
/////////////////////////////////////////////////////////////
editarDocmentos(){
  this.documentoserver.getDocumentoPorCedula(this.cedula_persona).subscribe( data =>{
    this.documentomodel.docPersonasBeneficiarios=data.docPersonasBeneficiarios
    for(let i in data.docPersonasBeneficiarios){
      this.arrayLiStaNombres.push(this.documentomodel.docPersonasBeneficiarios[i])
      this.valImg=this.arrayLiStaNombres[i][2]
    } 
  })
}
selectFile(event):any{
this.archivos=[];
if(this.tipoDocumento==null){
  alert("seleccione el tipo de documento")
}else{
  this.reperarevent(event);
for(var i=0;i<=File.length;i++){
 this.nombreDoc=event.target.files[i].name;
      this.arrayLiStaNombres.push([this.tipoDocumento,this.nombreDoc])
 }}
 this.tipoDocumento=null;
}

eliminar(i){
  var elimianar
  Swal.fire({
    title: 'Esta seguro de eliminar este documento',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Eliminado!',
        'Documento eliminado',
        'success'
      )
      elimianar=true;
      var verificacion=elimianar
      if (verificacion==true){
          this.arrayLista.splice(i,1);
          this.arrayLiStaNombres.splice(i,1);
      }
    }
  });
}
upload(){
  let i: number = 0;
  var numero= this.arrayLista.length
  while (i <= numero) {
    if(i==numero){
      alert("Documentos Guardados")
      this.addDocumentos();
      this.root.navigate(['lista-documentos']);
    }
    this.selectedFile=this.arrayLista[i]
    const file = this.selectedFile.item(0);
    i++;
  }
 }
 addDocumentos(){
  this.documentomodel.cedulaPersona=this.cedula_persona;
  this.documentomodel.docPersonasBeneficiarios=this.arrayLiStaNombres;
 this.documentoserver.updateDocumentos(this.documentomodel).subscribe( data => {
 })
}
}