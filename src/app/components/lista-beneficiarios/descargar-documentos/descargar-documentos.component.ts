import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DocumentosBeneficiarios } from '../../../models/documentos-beneficiarios';
import { DocumentosService } from '../../../services/documentos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-descargar-documentos',
  templateUrl: './descargar-documentos.component.html',
  styleUrls: ['./descargar-documentos.component.css']
})
export class DescargarDocumentosComponent implements OnInit {
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
      console.log(this.arrayDoc)
    })
  }
  descargarFile(nombre){
    const carpetafile=this.cedula_persona
    this.linkDescarga=this.documentoserver.dowloadedFile(carpetafile,nombre)
  }

  
}