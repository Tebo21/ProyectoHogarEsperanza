import { Component, OnInit } from '@angular/core';
import { DocumentosBeneficiarios } from '../../../models/documentos-beneficiarios';
import { DocumentosService } from '../../../services/documentos.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-documentos-persona',
  templateUrl: './documentos-persona.component.html',
  styleUrls: ['./documentos-persona.component.css']
})
export class DocumentosPersonaComponent implements OnInit {
  archivos:any=[];
  listaIMAGENES:any=[];
  previsualizar:string;
  nombreDoc:any;
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
  }

  selectFile(event):any{
    this.archivos=[];
    this.listaIMAGENES=[];
    if(this.tipoDocumento==null){
      alert("seleccione el tipo de documento")
  }else{
   //carga de documentos de base 64
   for(var i=0;i<=File.length;i++){
    var read = new FileReader();
    console.log(read);
    read.readAsDataURL(event.target.files[i])
    this.nombreDoc=event.target.files[i].name;
    read.onload = (event:any)=>{
      this.archivos.push(event.target.result)
    }
   }
   this.archivos.forEach(archis => {
    this.extraerBASE64(archis).then((imagen:any)=>{
      this.previsualizar = imagen.base;
    });
   });
   this.listaIMAGENES.push(this.archivos)
   console.log(this.listaIMAGENES)
   return this.archivos;
   //inicio carga de documentos de aws 
   console.log(this.nombreDoc) 
    this.arrayLiStaNombres.push([this.tipoDocumento,this.nombreDoc])
    this.tipoDocumento=null;
    this.nombreDoc=null;
    }
    this.valueFile=null
  }
  extraerBASE64=async($event:any)=> new Promise ((resolve, reject)=>{
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
      return null+"erro cargade imagenes"
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
    this.documentoserver.postRegostroDocumentos(this.documentomodel).subscribe(data =>{ 
    })
  }
}