import { Component, OnInit } from '@angular/core';
import { FichaSocioeconomicaService } from 'src/app/services/ficha-socioeconomica.service';
import { PersonasService } from 'src/app/services/personas.service';
import { RegistroFamiliaresService } from 'src/app/services/registro-familiares.service';
import { Router } from '@angular/router';
import { Personas } from 'src/app/models/personas';
import { RegistroFamiliares } from 'src/app/models/registro-familiares';
import { FichaSocioeconomica } from 'src/app/models/ficha-socioeconomica';

@Component({
  selector: 'app-lista-observaciones-personas',
  templateUrl: './lista-observaciones-personas.component.html',
  styleUrls: ['./lista-observaciones-personas.component.css']
})
export class ListaObservacionesPersonasComponent implements OnInit {
  persona: Personas = new Personas();
  public datos:any =[];
  public personaArray:any = [];
  public cedulaArray:any = [];
  constructor(private personaService:PersonasService,private root:Router) { }

  ngOnInit(): void {
    this.datos=[]
    this.personaArray=[]
    this.cedulaArray=[]
   this.listaPersona();
  this.listaFamiliares();
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

  ingresoObservacion(i){
    localStorage.setItem("cedulalocalstorage", i)
    this.root.navigate(['observaciones-personas']);
  }
}
