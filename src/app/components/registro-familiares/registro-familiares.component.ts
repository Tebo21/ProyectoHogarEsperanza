import { Component, OnInit } from '@angular/core';
import { Personas } from 'src/app/models/personas';
import { RegistroFamiliaresService } from 'src/app/services/registro-familiares.service';
import { RegistroFamiliares } from '../../models/registro-familiares';
import { Router } from '@angular/router';
import { PersonasService } from 'src/app/services/personas.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-registro-familiares',
  templateUrl: './registro-familiares.component.html',
  styleUrls: ['./registro-familiares.component.css']
})
export class RegistroFamiliaresComponent implements OnInit {

  famipersona:RegistroFamiliares=new RegistroFamiliares();
  PersonasFami: Personas = new Personas();
  public hijosArray:any = [];
  parentesco_familiar:string;
  cedula_persona:string=localStorage.getItem('cedulalocalstorage');
  persona: Personas = new Personas();
  nombreCompleto:string;
  blockSpecial: RegExp = /^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQWXYZ/;:]+$/
  constructor(private famipersonaserve:RegistroFamiliaresService, private personaService:PersonasService, private router:Router) { }

  ngOnInit(): void {
    this.cargarDatos()
    this.recargar()
  }

  recargar(){
    this.cargarDatos()
  }

  validarDatos(){
    var cedulaPer=this.PersonasFami.cedula
    var nombrePer=this.PersonasFami.nombres
    var apellPer=this.PersonasFami.apellidos
    var fechaNac=this.PersonasFami.fechaNacimiento
    var edaPer=this.PersonasFami.edad
    var gener=this.PersonasFami.genero
    var parentes=this.parentesco_familiar
    var ConfirmaValida=0
    if(cedulaPer == null){
      var cedul = document.getElementById("cedula")
      ConfirmaValida = ConfirmaValida + 1
      this.PersonasFami.cedula="0000000000"
    }else{
      if(cedulaPer.length==10){
        var cedul = document.getElementById("cedula")
        cedul.style.backgroundColor = "#FFFEFE"
        ConfirmaValida = ConfirmaValida + 1 
      } 
    }
     if(nombrePer == null){
      var nom = document.getElementById("nombre")
      nom.style.backgroundColor = "#FCAFAF"
    }else{
      var nom = document.getElementById("nombre")
      nom.style.backgroundColor = "#FFFEFE"
      ConfirmaValida = ConfirmaValida + 1
    }
     if(apellPer == null){
      var ape = document.getElementById("apellido")
      ape.style.backgroundColor = "#FCAFAF"
    } else {
        var ape = document.getElementById("apellido")
        ape.style.backgroundColor = "#FFFEFE"
        ConfirmaValida = ConfirmaValida + 1  
    }
    if(fechaNac==null){
      var feN = document.getElementById("fechaNacimiento")
      this.PersonasFami.fechaNacimiento="00/00/00"
      ConfirmaValida = ConfirmaValida + 1
    }else{
      var feN = document.getElementById("fechaNacimiento")
      feN.style.backgroundColor = "#FFFEFE"
      ConfirmaValida = ConfirmaValida + 1
    }
    if(edaPer=null){
      var eda = document.getElementById("edad")
      eda.style.backgroundColor = "#FCAFAF"
    }else{
      var eda = document.getElementById("edad")
      eda.style.backgroundColor = "#FFFEFE"
      ConfirmaValida = ConfirmaValida + 1
    }
    if(gener==null){
      var gen = document.getElementById("genero")
      gen.style.backgroundColor = "#FCAFAF"
    }else{
      var gen = document.getElementById("genero")
      gen.style.backgroundColor = "#FFFEFE"
      ConfirmaValida = ConfirmaValida + 1
    }
    if(parentes==null){
      var gen = document.getElementById("parentesco")
      gen.style.backgroundColor = "#FCAFAF"
    }else{
      var gen = document.getElementById("parentesco")
      gen.style.backgroundColor = "#FFFEFE"
      ConfirmaValida = ConfirmaValida + 1
    }
    return ConfirmaValida;
    ConfirmaValida = 0;
  }
 
  addArray(){
    var cedula_hijo = this.PersonasFami.cedula;
    var nombre_hijo = this.PersonasFami.nombres;
    var apellido_hijo = this.PersonasFami.apellidos;
    var celular_hijo = this.PersonasFami.celular;
    var correo_hijo = this.PersonasFami.correo; 
    var fecha_nacimiento_hijo = this.PersonasFami.fechaNacimiento;
    var edad_hijo = this.PersonasFami.edad;
    var genero_hijo= this.PersonasFami.genero;
    var parentesco = this.parentesco_familiar;
    if(this.validarDatos()!=7){
      Swal.fire({
        title: 'Verifique los campos en rojo',
        icon: 'warning',
      });
      if(cedula_hijo.length!=10){
        Swal.fire({
          title: 'Cedula incorrecta',
          icon: 'warning',
        });
      }
    }else{
     this.hijosArray.push([cedula_hijo,nombre_hijo,apellido_hijo,celular_hijo,
       correo_hijo,fecha_nacimiento_hijo,edad_hijo,genero_hijo,parentesco]);
       this.nuevo()
    }
   }
   cargarDatos(){
    this.personaService.getPorCedula(this.cedula_persona).subscribe(data =>{
      this.persona=data
      this.nombreCompleto = this.persona.nombres+" "+this.persona.apellidos
    })
  }
   nuevo(){
    this.PersonasFami.cedula=null;
    this.PersonasFami.nombres=null;
    this.PersonasFami.apellidos=null;
    this.PersonasFami.celular=null;
    this.PersonasFami.correo=null;
    this.PersonasFami.fechaNacimiento=null;
    this.PersonasFami.edad=null;
    this.PersonasFami.genero=null;
    this.parentesco_familiar=null; 
  }

  actualiza(i){
    var arrayactualizacion =this.hijosArray[i] 
    this.PersonasFami.cedula=arrayactualizacion[0];
    this.PersonasFami.nombres=arrayactualizacion[1];
    this.PersonasFami.apellidos=arrayactualizacion[2];
    this.PersonasFami.celular=arrayactualizacion[3];
    this.PersonasFami.correo=arrayactualizacion[4];
    this.PersonasFami.fechaNacimiento=arrayactualizacion[5];
    this.PersonasFami.edad=arrayactualizacion[6];
    this.PersonasFami.genero=arrayactualizacion[7];
    this.parentesco_familiar=arrayactualizacion[8];
    this.hijosArray.splice(i,1)
    arrayactualizacion.splice(i,1)
  }

  eliminar(i){
    var elimianar
    Swal.fire({
      title: 'Esta seguro de eliminar este usuario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'Familiar eliminado',
          'success'
        )
        elimianar=true;
        var verificacion=elimianar
        if (verificacion==true){
         this.hijosArray.splice(i,1)
        }
      }
    });
  }
  calcularedad(event:any){
    let fecha=new Date(event.target.value);
    let fechactual=new Date();
    var f1 = fechactual.getFullYear()-fecha.getFullYear();
    this.PersonasFami.edad=f1
  }

  addPerFami(){
    this.cedula_persona=localStorage.getItem('cedulalocalstorage')
    var cantidad_hijos=this.hijosArray.length;
    this.famipersona.cedulaPersona=this.cedula_persona;
    this.famipersona.numHijos=cantidad_hijos;
    this.famipersona.hijos=this.hijosArray
    this.famipersonaserve.postRegistFami(this.famipersona).subscribe
    (data=>{
    });
    this.router.navigate(['ficha-socioeconomica'])
  }

}