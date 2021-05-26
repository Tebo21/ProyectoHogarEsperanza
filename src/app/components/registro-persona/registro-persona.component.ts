import { Component, OnInit } from '@angular/core';
import { Personas } from '../../models/personas';
import { PersonasService } from '../../services/personas.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro-persona',
  templateUrl: './registro-persona.component.html',
  styleUrls: ['./registro-persona.component.css']
})
export class RegistroPersonaComponent implements OnInit {
  Personas: Personas=new Personas(); 
  mensaje:boolean
  today= new Date();
  fecha =  new Date();
  fecha1 =  new Date();
  f1: Number;
  constructor(private PersonasService:PersonasService, private router:Router) { }

  ngOnInit(): void {
  }

  addPersona(){
    var cedulalocalstorage = this.Personas.cedula
    localStorage.setItem("cedulalocalstorage",cedulalocalstorage)
    this.PersonasService.postPersona(this.Personas)
    .subscribe(data=>{
      console.log("persona registrada")
    },
    error=>console.log("mensajito"+error));
    this.router.navigate(['/registro-familiares'])
  }

  validar(){
    if(this.Personas.cedula.length==10){
             this.mensaje=true;      
    }else{
      var cedul = document.getElementById("cedula")
      cedul.style.backgroundColor="#FF5733"
          this.mensaje=false    
          console.log("cedula")    
    }
     if(this.Personas.nombres.length==0){             
      var nom = document.getElementById("nombres")
      nom.style.backgroundColor="#FF5733"
      this.mensaje=false
      console.log("asd")
    }else{
      this.mensaje=true;
      console.log("asd")
    }
    
    if(this.Personas.apellidos.length<=0){
            this.mensaje=true;
    }else{
      var ape = document.getElementById("apellidos")
      ape.style.backgroundColor="#FF5733"
      this.mensaje=false
    }
    return this.mensaje
  }

  calcularedad(event:any){
    let fecha=new Date(event.target.value);
    let fechactual=new Date();
    var f1 = fechactual.getFullYear()-fecha.getFullYear();
    this.Personas.edad=f1
  }

}
