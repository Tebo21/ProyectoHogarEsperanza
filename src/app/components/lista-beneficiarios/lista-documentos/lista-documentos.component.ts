import { Component, OnInit } from '@angular/core';
import { FichaSocioeconomicaService } from 'src/app/services/ficha-socioeconomica.service';
import { PersonasService } from 'src/app/services/personas.service';
import { RegistroFamiliaresService } from 'src/app/services/registro-familiares.service';
import { Router } from '@angular/router';
import { Personas } from 'src/app/models/personas';
import { RegistroFamiliares } from 'src/app/models/registro-familiares';
import { FichaSocioeconomica } from 'src/app/models/ficha-socioeconomica';
import { DocumentosService } from '../../../services/documentos.service';
import { DocumentosBeneficiarios } from 'src/app/models/documentos-beneficiarios';

@Component({
  selector: 'app-lista-documentos',
  templateUrl: './lista-documentos.component.html',
  styleUrls: ['./lista-documentos.component.css']
})
export class ListaDocumentosComponent implements OnInit {
  persona: Personas = new Personas();
  public datos:any =[];
  public personaArray:any = [];
  public cedulaArray:any = [];
  public documentosfile: DocumentosBeneficiarios = new DocumentosBeneficiarios();
  constructor(private docServer:DocumentosService,private personaService:PersonasService,private root:Router) { }

  ngOnInit(): void {
 //   this.datos=[]
 //   this.personaArray=[]
 //   this.cedulaArray=[]
 //  this.listaPersona();
 // this.listaFamiliares();
  this.actualizar()
  }

  actualizar(){
    this.datos=[]
  this.listaPersona();
  this.listaFamiliares();
  }

  listaPersona(){
  this.personaService.getPersona().subscribe(data =>{
      for(let i in data){
        this.persona=data[i];
        if(this.persona.beneficiario==true){
          this.cedulaArray.push(this.persona.cedula)
          this.personaArray.push([this.persona.cedula, this.persona.nombres, 
          this.persona.apellidos, this.persona.direccion, this.persona.celular, 
          this.persona.correo, this.persona.fechaNacimiento, this.persona.edad])
          for(var l = this.cedulaArray.length -1; l >=0; l--){
            if(this.cedulaArray.indexOf(this.cedulaArray[l]) !== l) this.cedulaArray.splice(l,1);
          }
          for(var l = this.personaArray.length -1; l >=0; l--){
            if(this.personaArray.indexOf(this.personaArray[l]) !== l) this.personaArray.splice(l,1);
          }
        }
      }
     });
  }
  listaFamiliares(){
     for(let c in this.cedulaArray){ 
        const datosLista={
           cedula:this.personaArray[c][0], 
           nombres:this.personaArray[c][1],
           apellidos:this.personaArray[c][2],
           direccion:this.personaArray[c][3],
           celular:this.personaArray[c][4],
           correo:this.personaArray[c][5],
           fechaNacimiento:this.personaArray[c][6],
           edad:this.personaArray[c][7]
         }
         if(this.datos.length<this.cedulaArray.length){
          this.datos.push(datosLista)
         }
     }
  } 
  ingresoCrearDocumento(i){
    localStorage.setItem("cedulalocalstorage", i)
    this.docServer.getDocumentoPorCedula(i).subscribe( data => {
      if(data==null){
        this.root.navigate(['documentos-persona']);
      }else{
        this.root.navigate(['editar-documentos']);
      }
    })
  }
  ingresoDescargaDocumentos(i){
    localStorage.setItem("cedulalocalstorage", i)
    this.root.navigate(['descargar-documentos'])
  }
  ingresoEditarDocumentos(i){
    localStorage.setItem("cedulalocalstorage", i)
    this.docServer.getDocumentoPorCedula(i).subscribe( data => {
      if(data==null){
        this.root.navigate(['documentos-persona']);
      }else{
        this.root.navigate(['editar-documentos']);
      }
    });
  }
}
