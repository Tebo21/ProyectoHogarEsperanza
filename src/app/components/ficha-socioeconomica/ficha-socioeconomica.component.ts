import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FichaSocioeconomica } from 'src/app/models/ficha-socioeconomica';
import { FichaSocioeconomicaService } from 'src/app/services/ficha-socioeconomica.service';
import { Router } from '@angular/router';
import { Personas } from 'src/app/models/personas';
import { PersonasService } from 'src/app/services/personas.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-ficha-socioeconomica',
  templateUrl: './ficha-socioeconomica.component.html',
  styleUrls: ['./ficha-socioeconomica.component.css']
})
export class FichaSocioeconomicaComponent implements OnInit {
  fichasocieconomicaModel: FichaSocioeconomica = new FichaSocioeconomica();
  fechaActual = new Date();
  persona: Personas = new Personas();
  nombreCompleto:string;
  cedula_persona:string=localStorage.getItem('cedulalocalstorage');
  constructor(private fichasocioserve:FichaSocioeconomicaService, private root:Router, private personaService:PersonasService) { }
  catalogoNacionalidad = ["Afganistán", "Alemania", "Arabia Saudita", "Argentina", "Australia", "Bélgica", "Bolivia",
    "Brasil", "Camboya", "Canadá", "Chile", "China", "Colombia", "Corea", "Costa Rica", "Cuba", "Dinamarca", "Ecuador",
    "Egipto", "El Salvador", "Escocia", "España", "Estados Unidos", "Estonia", "Etiopia", "Filipinas", "Finlandia",
    "Francia", "Gales", "Grecia", "Guatemala", "Haití", "Holanda", "Honduras", "Indonesia", "Inglaterra", "Irak",
    "Irán", "Irlanda", "Israel", "Italia", "Japón", "Jordania", "Laos", "Letonia", "Lituania", "Malasia", "Marruecos",
    "México", "Nicaragua", "Noruega", "Nueva Zelanda", "Panamá", "Paraguay", "Perú", "Polonia", "Portugal", "Puerto Rico",
    "Puerto Rico", "Republica Dominicana", "Rumania", "Rusia", "Suecia", "Suiza", "Tailandia", "Taiwán", "Turquía",
    "Ucrania", "Uruguay", "Venezuela", "Vietnam"];
  catalogoEstadoCivil = ["Soltero/a", "Casado/a", "Divorciado/a", "Viudo/a"];

  ngOnInit(): void {
    this.fecha_actual()
    this.cargarDatos()
  }
  fecha_actual(){
    let mes = this.fechaActual.getMonth()+1
    let fechahoy = this.fechaActual.getFullYear()+"/"+mes+"/"+this.fechaActual.getDate();
    let fechaActual2 = new Date(fechahoy);
    let fecha= formatDate(fechaActual2, 'yyyy-MM-dd ', 'en-ECU', '+0593');
    this.fichasocieconomicaModel.fechaRegistro=fecha;
  }
  validarDatos(){
    var SituacEco=this.fichasocieconomicaModel.situacionEconomica;
    var TipoVivi=this.fichasocieconomicaModel.tipoVivienda;
    var DescrVivi=this.fichasocieconomicaModel.descripcionVivienda;
    var CuSeguro=this.fichasocieconomicaModel.seguro;
    var salario=this.fichasocieconomicaModel.salario;
    var Nacionalidad=this.fichasocieconomicaModel.nacionalidad;
    var estadoCivi=this.fichasocieconomicaModel.estadoCivil;
    var discapa=this.fichasocieconomicaModel.discapacidad;
    var adulMay=this.fichasocieconomicaModel.adultoMayor;
    var VivCotr=this.fichasocieconomicaModel.viveConOtros;
    var ConfirmaValida=0
    if(SituacEco == null){
      var situeco = document.getElementById("situacionEconomica")
      situeco.style.backgroundColor = "#FCAFAF"
    }else{
        var situeco = document.getElementById("situacionEconomica")
        situeco.style.backgroundColor = "#FFFEFE"
        ConfirmaValida = ConfirmaValida + 1 
    }
     if(TipoVivi == null){
      var tipviv = document.getElementById("tipoVivienda")
      tipviv.style.backgroundColor = "#FCAFAF"
    }else{
      var tipviv = document.getElementById("tipoVivienda")
      tipviv.style.backgroundColor = "#FFFEFE"
      ConfirmaValida = ConfirmaValida + 1
    }
     if(DescrVivi == null){
      var desviv = document.getElementById("descripcionVivienda")
      desviv.style.backgroundColor = "#FCAFAF"
    } else {
        var desviv = document.getElementById("descripcionVivienda")
        desviv.style.backgroundColor = "#FFFEFE"
        ConfirmaValida = ConfirmaValida + 1  
    }
    if(CuSeguro==null){
      var conseg = document.getElementById("Seguro")
      conseg.style.backgroundColor = "#FCAFAF"
    }else{
      var conseg = document.getElementById("Seguro")
      conseg.style.backgroundColor = "#FFFEFE"
      ConfirmaValida = ConfirmaValida + 1
    }
    if(salario==null){
      var sala = document.getElementById("Salario")
      sala.style.backgroundColor = "#FCAFAF"
    }else{
      var sala = document.getElementById("Salario")
      sala.style.backgroundColor = "#FFFEFE"
      ConfirmaValida = ConfirmaValida + 1
    }
    if(Nacionalidad==null){
      var nacio = document.getElementById("Nacionalidad")
      nacio.style.backgroundColor = "#FCAFAF"
    }else{
      var nacio = document.getElementById("Nacionalidad")
      nacio.style.backgroundColor = "#FFFEFE"
      ConfirmaValida = ConfirmaValida + 1
    }
    if(estadoCivi==null){
      var estCv = document.getElementById("EstadoCivil")
      estCv.style.backgroundColor = "#FCAFAF"
    }else{
      var estCv = document.getElementById("EstadoCivil")
      estCv.style.backgroundColor = "#FFFEFE"
      ConfirmaValida = ConfirmaValida + 1
    }
    if(discapa==null){
      var disca = document.getElementById("Discapacidad")
      disca.style.backgroundColor = "#FCAFAF"
    }else{
      var disca = document.getElementById("Discapacidad")
      disca.style.backgroundColor = "#FFFEFE"
      ConfirmaValida = ConfirmaValida + 1
    }
    if(adulMay==null){
      var gen = document.getElementById("AdultoMayor")
      gen.style.backgroundColor = "#FCAFAF"
    }else{
      var gen = document.getElementById("AdultoMayor")
      gen.style.backgroundColor = "#FFFEFE"
      ConfirmaValida = ConfirmaValida + 1
    }
    if(VivCotr==null){
      var gen = document.getElementById("viveOtros")
      gen.style.backgroundColor = "#FCAFAF"
    }else{
      var gen = document.getElementById("viveOtros")
      gen.style.backgroundColor = "#FFFEFE"
      ConfirmaValida = ConfirmaValida + 1
    }
    return ConfirmaValida;
    ConfirmaValida = 0;
  }
  validarDisca(event:any){
    let desDisc=event.target.value;
    var f1 = desDisc;
    if(f1=="false"){
      var descDisca = document.getElementById("descripcionDiscapacidad");
      descDisca.style.display = "none"
      this.fichasocieconomicaModel.discapacidadDescipcion="Descripción Discapacidad"
    }else if(f1=="true"){
      var descDisca = document.getElementById("descripcionDiscapacidad");
      descDisca.style.display = ""
      this.fichasocieconomicaModel.discapacidadDescipcion=""
    }
  }
  addFicha(){
    if(this.validarDatos()!=10){
      Swal.fire({
        title: 'Verifique los campos en rojo',
        icon: 'warning',
      });
   }else{
    var cedula_persona=localStorage.getItem('cedulalocalstorage');
    this.fichasocieconomicaModel.cedulaPersona=cedula_persona;
    this.fichasocioserve.postFichaSocio(this.fichasocieconomicaModel).subscribe(data=>{
      console.log("ficha 1 creada")
    });
    this.root.navigate(['vista-ficha'])
    }
  }
  cargarDatos(){
    //datos persona
    this.personaService.getPorCedula(this.cedula_persona).subscribe(data =>{
      this.persona=data
      this.nombreCompleto = this.persona.nombres+" "+this.persona.apellidos
    })
  }
}