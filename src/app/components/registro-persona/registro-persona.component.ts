import { Component, OnInit } from '@angular/core';
import { Personas } from '../../models/personas';
import { PersonasService } from '../../services/personas.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { RegistroFamiliaresService } from '../../services/registro-familiares.service';
import { FichaSocioeconomicaService } from 'src/app/services/ficha-socioeconomica.service';


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
  blockSpecial: RegExp = /^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQWXYZ/;:]+$/
  constructor(private FAMIserver:RegistroFamiliaresService,private fichaServer:FichaSocioeconomicaService,private PersonasService: PersonasService, private router: Router) { }
  tipoUser: any;
  ngOnInit(): void {
    this.ComprobarLogin();
  }
  ComprobarLogin() {
    this.tipoUser = localStorage.getItem('rolUser');
    if (this.tipoUser == '1' || this.tipoUser == 2) {
    } else if (this.tipoUser == '3' || this.tipoUser == '4') {
      Swal.fire({
        title: 'No tiene permisos para registrar beneficiarios',
        icon: 'warning',
      });
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
      cedul.style.backgroundColor = "#FCAFAF"
    }else{
      if(cedulaPer.length==10){
        var cedul = document.getElementById("cedula")
        cedul.style.backgroundColor = "#FFFEFE"
        ConfirmaValida = ConfirmaValida + 1 
      }else{
        Swal.fire({
          title: 'cedula incorrecta',
          icon: 'warning',
        });
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
    return ConfirmaValida;
    ConfirmaValida = 0;
  } 
  addPersona() {
    var confiVali=this.validarDatos()
    if(confiVali==3){
        var cedulalocalstorage = this.Personas.cedula
    localStorage.setItem("cedulalocalstorage", cedulalocalstorage)
   this.PersonasService.getPorCedula(this.Personas.cedula).subscribe( data =>{
     if(data==null){
      this.Personas.beneficiario=true
      this.Personas.estadoActivo=true
      this.PersonasService.postPersona(this.Personas)
      .subscribe(data => {
        console.log("persona registrada")
      },
        error => console.log(error));
      this.router.navigate(['registro-familiares'])
     }else{
        if(data.beneficiario==false){
          data.beneficiario=true;
          if(data.estadoActivo==false){
            data.estadoActivo=true;
          }
          this.PersonasService.updatePersona(data).subscribe(data=>{
          })
        }
       this.FAMIserver.getfamicedula(this.Personas.cedula).subscribe(data => {
         if(data==null){
          Swal.fire({
            title: 'Persona Registrada Registre los Familiares de la cedula '+this.Personas.cedula,
            icon: 'warning',
          });
          this.router.navigate(['registro-familiares'])            
         }else{
           this.fichaServer.getfichacedula(this.Personas.cedula).subscribe( data => {
           if(data==null){
            Swal.fire({
              title: 'Persona Registrada Registre la Ficha de la cedula '+this.Personas.cedula,
              icon: 'warning',
            });
            this.router.navigate(['ficha-socioeconomica'])
           }else{
            Swal.fire({
              title: 'Beneficiario Registrado',
              icon: 'warning',
            });
            this.router.navigate(['lista-beneficiarios'])
           } 
          })
         }
       })
     }
   })
   }else{
      Swal.fire({
        title: 'Verifique los campos en rojo',
        icon: 'warning',
      });
    }
  }
  calcularedad(event: any) {
    let fecha = new Date(event.target.value);
    let fechactual = new Date();
    var f1 = fechactual.getFullYear() - fecha.getFullYear();
    this.Personas.edad = f1
  }
}
