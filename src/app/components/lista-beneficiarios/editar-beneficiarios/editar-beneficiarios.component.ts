import { Component, OnInit } from '@angular/core';
import { FichaSocioeconomica } from 'src/app/models/ficha-socioeconomica';
import { Personas } from 'src/app/models/personas';
import { Router } from '@angular/router';
import { RegistroFamiliares } from 'src/app/models/registro-familiares';
import { FichaSocioeconomicaService } from 'src/app/services/ficha-socioeconomica.service';
import { PersonasService } from 'src/app/services/personas.service';
import { RegistroFamiliaresService } from 'src/app/services/registro-familiares.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-editar-beneficiarios',
  templateUrl: './editar-beneficiarios.component.html',
  styleUrls: ['./editar-beneficiarios.component.css']
})
export class EditarBeneficiariosComponent implements OnInit {
  persona : Personas = new Personas();
  PersonasFami : Personas = new Personas();
  familia : RegistroFamiliares = new RegistroFamiliares();
  ficha: FichaSocioeconomica = new FichaSocioeconomica();
  cedula_hijo : string;
  nombre_hijo : string;
  apellido_hijo : string;
  celular_hijo : string;
  correo_hijo : string; 
  fecha_nacimiento_hijo :string;
  edad_hijo :string;
  genero_hijo : string;
  parentesco_familiar:string;
  public hijosArray:any = [];
  cedula_persona:string = localStorage.getItem('cedulalocalstorage');
  catalogoNacionalidad = ["Afganistán", "Alemania", "Arabia Saudita", "Argentina", "Australia", "Bélgica", "Bolivia",
    "Brasil", "Camboya", "Canadá", "Chile", "China", "Colombia", "Corea", "Costa Rica", "Cuba", "Dinamarca", "Ecuador",
    "Egipto", "El Salvador", "Escocia", "España", "Estados Unidos", "Estonia", "Etiopia", "Filipinas", "Finlandia",
    "Francia", "Gales", "Grecia", "Guatemala", "Haití", "Holanda", "Honduras", "Indonesia", "Inglaterra", "Irak",
    "Irán", "Irlanda", "Israel", "Italia", "Japón", "Jordania", "Laos", "Letonia", "Lituania", "Malasia", "Marruecos",
    "México", "Nicaragua", "Noruega", "Nueva Zelanda", "Panamá", "Paraguay", "Perú", "Polonia", "Portugal", "Puerto Rico",
    "Puerto Rico", "Republica Dominicana", "Rumania", "Rusia", "Suecia", "Suiza", "Tailandia", "Taiwán", "Turquía",
    "Ucrania", "Uruguay", "Venezuela", "Vietnam"];
  catalogoEstadoCivil = ["Soltero/a", "Casado/a", "Divorciado/a", "Viudo/a"];

  constructor(private personaService: PersonasService, private familiaService: RegistroFamiliaresService, private fichaServices: FichaSocioeconomicaService,private root:Router) { }

  ngOnInit(): void {
    this.datosPersona();
  }

  datosPersona(){
    this.personaService.getPorCedula(this.cedula_persona).subscribe(data =>{
      this.persona=data;
      this.datosFamiliares();
      this.datosFicha();
    })
  }
  datosFamiliares(){
    this.familiaService.getfamicedula(this.cedula_persona).subscribe(data => {
      this.familia.hijos=data.hijos;
      for(let i in data.hijos){
        this.hijosArray.push(this.familia.hijos[i])
      }
      console.log(this.hijosArray)
    })
  }
  datosFicha(){
    this.fichaServices.getfichacedula(this.cedula_persona).subscribe(data =>{
      this.ficha=data;
    })
  }
  calcularedad(event: any) {
    let fecha = new Date(event.target.value);
    let fechactual = new Date();
    var f1 = fechactual.getFullYear() - fecha.getFullYear();
    this.persona.edad = f1
  }
  calcularedad2(event: any) {
    let fecha = new Date(event.target.value);
    let fechactual = new Date();
    var f1 = fechactual.getFullYear() - fecha.getFullYear();
    this.edad_hijo = f1+""
  }
  addArray(){
     this.hijosArray.push([this.cedula_hijo,this.nombre_hijo,this.apellido_hijo,this.celular_hijo,
      this.correo_hijo,this.fecha_nacimiento_hijo,this.edad_hijo,this.genero_hijo,this.parentesco_familiar]);
       this.nuevo()
}
nuevo(){
  this.cedula_hijo=null;
  this.nombre_hijo=null;
  this.apellido_hijo=null;
  this.celular_hijo=null;
  this.correo_hijo=null;
  this.fecha_nacimiento_hijo=null;
  this.edad_hijo=null;
  this.genero_hijo=null;
  this.parentesco_familiar=null; 
}
actualiza(i){
  var arrayactualizacion =this.hijosArray[i] 
  this.cedula_hijo=arrayactualizacion[0];
  this.nombre_hijo=arrayactualizacion[1];
  this.apellido_hijo=arrayactualizacion[2];
  this.celular_hijo=arrayactualizacion[3];
  this.correo_hijo=arrayactualizacion[4];
  this.fecha_nacimiento_hijo=arrayactualizacion[5];
  this.edad_hijo=arrayactualizacion[6];
  this.genero_hijo=arrayactualizacion[7];
  this.parentesco_familiar=arrayactualizacion[8];
  this.hijosArray.splice(i,1)
  arrayactualizacion.splice(i,1)
}
eliminar(j){
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
       this.hijosArray.splice(j,1)
      }
    }
  });
}
 actualizarRegistro(){
   this.persona.beneficiario=true;
   this.persona.estadoActivo=true;
   this.personaService.updatePersona(this.persona).subscribe( data=> {
   });
   this.actualizarFamilia();
   this.actualizarFicha();
 }
 actualizarFamilia(){
   this.familia.cedulaPersona=this.cedula_persona
   this.familia.numHijos=this.hijosArray.length;
   this.familia.hijos=this.hijosArray;
   this.familiaService.updateFamiliares(this.familia).subscribe(data => {
   });
 }
 actualizarFicha(){
   this.ficha.cedulaPersona=this.cedula_persona
   this.fichaServices.updateFicha(this.ficha).subscribe( data => {
   });
          Swal.fire(
        'Actualizado!',
        'Registro actualizado',
        'success'
      )
      this.root.navigate(['lista-beneficiarios']);
 }
}