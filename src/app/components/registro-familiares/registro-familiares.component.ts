import { Component, OnInit } from '@angular/core';
import { Personas } from 'src/app/models/personas';
import { RegistroFamiliaresService } from 'src/app/services/registro-familiares.service';
import { RegistroFamiliares } from '../../models/registro-familiares';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-familiares',
  templateUrl: './registro-familiares.component.html',
  styleUrls: ['./registro-familiares.component.css']
})
export class RegistroFamiliaresComponent implements OnInit {

  famipersona:RegistroFamiliares=new RegistroFamiliares();
  PersonasFami: Personas = new Personas();
  public hijosArray:any = [];

  constructor(private famipersonaserve:RegistroFamiliaresService, private router:Router) { }

  ngOnInit(): void {
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
    if(cedula_hijo==null || nombre_hijo==null || fecha_nacimiento_hijo==null || edad_hijo==null || genero_hijo==null ){
       confirm("Complete los campos vacios para poder continuar")
    }else{
     this.hijosArray.push([cedula_hijo,nombre_hijo,apellido_hijo,celular_hijo,
       correo_hijo,fecha_nacimiento_hijo,edad_hijo,genero_hijo]);
       this.nuevo()
    }
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
    this.hijosArray.pop(i)
    arrayactualizacion.pop(i)
  }

  eliminar(i){
    var verificacion=confirm("Esta seguro de eliminar los datos")
    if (verificacion==true){
     this.hijosArray.pop(i)
    }
  }

  calcularedad(event:any){
    let fecha=new Date(event.target.value);
    let fechactual=new Date();
    var f1 = fechactual.getFullYear()-fecha.getFullYear();
    this.PersonasFami.edad=f1
  }

  addPerFami(){
    var cedula_persona=localStorage.getItem('cedulalocalstorage');
    var cantidad_hijos=this.hijosArray.length;
    this.famipersona.cedulaPersona=cedula_persona;
    this.famipersona.numHijos=cantidad_hijos;
    this.famipersona.hijos=this.hijosArray
    console.log(this.famipersona)
    this.famipersonaserve.postRegistFami(this.famipersona).subscribe
    (data=>{
      console.log("hijos registrados")
    });
    this.router.navigate(['/ficha-socioeconomica'])
  }

}


  