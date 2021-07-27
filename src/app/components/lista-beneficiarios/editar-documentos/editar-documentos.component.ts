import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentosBeneficiarios } from '../../../models/documentos-beneficiarios';
import { DocumentosService } from '../../../services/documentos.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-editar-documentos',
  templateUrl: './editar-documentos.component.html',
  styleUrls: ['./editar-documentos.component.css']
})
export class EditarDocumentosComponent implements OnInit {
selectedFile: FileList;   
  arrayLista:any=[];
  arrayLiStaNombres:any=[];
  valueFile:any;
  tiempoCarga:any;
  cantidad:any;
  tipoDocumento:String;
  documentomodel:DocumentosBeneficiarios = new  DocumentosBeneficiarios();
  cedula_persona:string = localStorage.getItem('cedulalocalstorage');
  constructor(private documentoserver:DocumentosService,private root:Router) {
   }

  ngOnInit(): void {
  this.editarDocmentos();
  }

  editarDocmentos(){
    this.documentoserver.getDocumentoPorCedula(this.cedula_persona).subscribe( data =>{
      this.documentomodel.docPersonasBeneficiarios=data.docPersonasBeneficiarios
      for(let i in data.docPersonasBeneficiarios){
        this.arrayLiStaNombres.push(this.documentomodel.docPersonasBeneficiarios[i])
      } 
    })
  }

  selectFile(event){
    if(this.tipoDocumento==null){
      alert("seleccione el tipo de documento")
    }else{
    this.selectedFile = event.target.files;
    this.arrayLista.push(this.selectedFile)
    this.arrayLiStaNombres.push([this.tipoDocumento,event.target.files[0].name])
    this.tipoDocumento=null;
    }
    this.valueFile=null
  }
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
   // this.documentoserver.postRegostroDocumentos(this.documentomodel).subscribe(data =>{ 
   // })
   this.documentoserver.updateDocumentos(this.documentomodel).subscribe( data => {
   })
  }
}