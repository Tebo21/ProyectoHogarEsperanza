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
  catalogoNacionalidad = ["Afganistán","Alemania","Arabia Saudita", "Argentina", "Australia", "Bélgica", "Bolivia",
   "Brasil", "Camboya", "Canadá", "Chile", "China", "Colombia", "Corea", "Costa Rica", "Cuba", "Dinamarca", "Ecuador",
   "Egipto", "El Salvador", "Escocia", "España", "Estados Unidos", "Estonia", "Etiopia", "Filipinas", "Finlandia",
   "Francia", "Gales", "Grecia", "Guatemala", "Haití", "Holanda", "Honduras", "Indonesia", "Inglaterra", "Irak",
   "Irán", "Irlanda", "Israel", "Italia", "Japón", "Jordania", "Laos", "Letonia", "Lituania", "Malasia", "Marruecos",
   "México", "Nicaragua", "Noruega", "Nueva Zelanda", "Panamá", "Paraguay", "Perú", "Polonia", "Portugal", "Puerto Rico",
   "Puerto Rico", "Republica Dominicana", "Rumania", "Rusia", "Suecia", "Suiza", "Tailandia", "Taiwán", "Turquía",
    "Ucrania", "Uruguay", "Venezuela", "Vietnam"];
    catalogoEstadoCivil = ["Soltero/a","Casado/a", "Divorciado/a", "Viudo/a"];
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
