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
  Personas: Personas = new Personas();
  mensaje: boolean
  today = new Date();
  fecha = new Date();
  fecha1 = new Date();
  catalogoNacionalidad = ["Afganistán", "Alemania", "Arabia Saudita", "Argentina", "Australia", "Bélgica", "Bolivia",
    "Brasil", "Camboya", "Canadá", "Chile", "China", "Colombia", "Corea", "Costa Rica", "Cuba", "Dinamarca", "Ecuador",
    "Egipto", "El Salvador", "Escocia", "España", "Estados Unidos", "Estonia", "Etiopia", "Filipinas", "Finlandia",
    "Francia", "Gales", "Grecia", "Guatemala", "Haití", "Holanda", "Honduras", "Indonesia", "Inglaterra", "Irak",
    "Irán", "Irlanda", "Israel", "Italia", "Japón", "Jordania", "Laos", "Letonia", "Lituania", "Malasia", "Marruecos",
    "México", "Nicaragua", "Noruega", "Nueva Zelanda", "Panamá", "Paraguay", "Perú", "Polonia", "Portugal", "Puerto Rico",
    "Puerto Rico", "Republica Dominicana", "Rumania", "Rusia", "Suecia", "Suiza", "Tailandia", "Taiwán", "Turquía",
    "Ucrania", "Uruguay", "Venezuela", "Vietnam"];
  catalogoEstadoCivil = ["Soltero/a", "Casado/a", "Divorciado/a", "Viudo/a"];
  f1: Number;
  constructor(private PersonasService: PersonasService, private router: Router) { }
  tipoUser: any;
  ngOnInit(): void {
    this.ComprobarLogin();
  }
  ComprobarLogin() {
    this.tipoUser = localStorage.getItem('rolUser');
    if (this.tipoUser == '1' || this.tipoUser == 2) {
    } else if (this.tipoUser == '3' || this.tipoUser == '4') {
      alert('No tiene permisos para registrar beneficiarios')
      this.router.navigateByUrl('inicio-super-admin');
    }
  } 
  validarDatos(){
    var cedulaPer=this.Personas.cedula
    var nombrePer=this.Personas.nombres
    var apellPer=this.Personas.apellidos
    var ConfirmaValida=0
    if(cedulaPer == null){
      var cedul = document.getElementById("cedula")
      cedul.style.backgroundColor = "#FF0000"
    }else{
      if(cedulaPer.length==10){
        var cedul = document.getElementById("cedula")
        cedul.style.backgroundColor = "#FFFEFE"
        ConfirmaValida = ConfirmaValida + 1 
      }else{
        alert("cedula incorrecta")
      } 
    }
     if(nombrePer == null){
      var nom = document.getElementById("nombre")
      nom.style.backgroundColor = "#FF0000"
    }else{
      var nom = document.getElementById("nombre")
      nom.style.backgroundColor = "#FFFEFE"
      ConfirmaValida = ConfirmaValida + 1
    }
     if(apellPer == null){
      var ape = document.getElementById("apellido")
      ape.style.backgroundColor = "#FF0000"
    } else {
        var ape = document.getElementById("apellido")
        ape.style.backgroundColor = "#FFFEFE"
        ConfirmaValida = ConfirmaValida + 1  
    }
    return ConfirmaValida;
    ConfirmaValida = 0;
  } 
  addPersona() {
    var confiVali=this.validarDatos()
    if(confiVali==3){
        var cedulalocalstorage = this.Personas.cedula
    localStorage.setItem("cedulalocalstorage", cedulalocalstorage)
    this.PersonasService.postPersona(this.Personas)
      .subscribe(data => {
        console.log("persona registrada")
      },
        error => console.log(error));
    this.router.navigate(['registro-familiares'])
    }else{
      alert("Complete los campos en rojo")
    }
  }
  calcularedad(event: any) {
    let fecha = new Date(event.target.value);
    let fechactual = new Date();
    var f1 = fechactual.getFullYear() - fecha.getFullYear();
    this.Personas.edad = f1
  }
}
