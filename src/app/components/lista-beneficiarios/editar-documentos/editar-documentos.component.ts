import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentosBeneficiarios } from '../../../models/documentos-beneficiarios';
import { DocumentosService } from '../../../services/documentos.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-editar-documentos',
  templateUrl: './editar-documentos.component.html',
  styleUrls: ['./editar-documentos.component.css']
})
export class EditarDocumentosComponent implements OnInit {
  public archivos:any=[];
  public previsualizar:string;
  nombreDoc:any;
  DataBas:any;
valImg:any;
  selectedFile: FileList;   
  arrayLista:any=[];
  arrayLiStaNombres:any=[];
  valueFile:any;
  tiempoCarga:any;
  cantidad:any;
  tipoDocumento:String;
  documentomodel:DocumentosBeneficiarios = new  DocumentosBeneficiarios();
  cedula_persona:string = localStorage.getItem('cedulalocalstorage');
  constructor(private sant:DomSanitizer,private documentoserver:DocumentosService,private root:Router) {
   }

  ngOnInit(): void {
  this.editarDocmentos();  
}

  editarDocmentos(){
    this.documentoserver.getDocumentoPorCedula(this.cedula_persona).subscribe( data =>{
      this.documentomodel.docPersonasBeneficiarios=data.docPersonasBeneficiarios
      for(let i in data.docPersonasBeneficiarios){
        this.arrayLiStaNombres.push(this.documentomodel.docPersonasBeneficiarios[i])
        this.valImg=this.arrayLiStaNombres[i][2]
        console.log(this.valImg)
      } 
    })
  }

  selectFile(event):any{
    //carga de documentos de base 64
  this.archivos=[];
  let archfl;
  if(this.tipoDocumento==null){
    alert("seleccione el tipo de documento")
}else{
  for(var i=0;i<=File.length;i++){
   var read = new FileReader();
   read.readAsDataURL(event.target.files[i])
   this.nombreDoc=event.target.files[i].name;
   read.onload = (event:any)=>{
     archfl=event.target.result
     this.DataBas=archfl;
     fetch(this.DataBas).then(res => res.blob()).then(blob =>{
       const fb = new FormData();
       const file2 = new File([blob],this.nombreDoc);
       fb.append('file',file2)
       this.arrayLiStaNombres.push([this.tipoDocumento,this.nombreDoc,fb]) 
     })
   }
  }
   this.extraerBASE64(archfl).then((imagen:any)=>{
     this.previsualizar = imagen.base;
   });
  this.DataBas=null
  }
  return archfl;
  }

 extraerBASE64=async($event:any)=> new Promise ((resolve,reject)=>{
   try {
     const usafeimg = window.URL.createObjectURL($event);
     const image = this.sant.bypassSecurityTrustUrl(usafeimg);
     let reader = new FileReader();
     reader.readAsDataURL($event);
     reader.onload = () =>{
       resolve({
         blob:$event,
         image,
         base:reader.result as string
       });
     };
   } catch (error) {
     return null+"error carga de imagenes"
   }
 });
 upload(){
    let i: number = 0;
    var numero= this.arrayLista.length
    this.tiempoCarga="40%"
    while (i <= numero) {
      if(i==numero){
        this.tiempoCarga="100%"
        alert("Documentos Guardados")
        this.addDocumentos();
        this.root.navigate(['lista-documentos']);
      }
      this.selectedFile=this.arrayLista[i]
      const file = this.selectedFile.item(0);
      this.documentoserver.uploadfile(this.cedula_persona,file);
      i++;
    }
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
  addDocumentos(){
    this.documentomodel.cedulaPersona=this.cedula_persona;
    this.documentomodel.docPersonasBeneficiarios=this.arrayLiStaNombres;
   this.documentoserver.updateDocumentos(this.documentomodel).subscribe( data => {
   })
  }
}