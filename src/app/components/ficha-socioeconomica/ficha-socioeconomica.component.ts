import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FichaSocioeconomica } from 'src/app/models/ficha-socioeconomica';
import { FichaSocioeconomicaService } from 'src/app/services/ficha-socioeconomica.service';
import { Router } from '@angular/router';
import { Personas } from 'src/app/models/personas';
import { PersonasService } from 'src/app/services/personas.service';

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
  addFicha(){
    var cedula_persona=localStorage.getItem('cedulalocalstorage');
    this.fichasocieconomicaModel.cedulaPersona=cedula_persona;
    this.fichasocioserve.postFichaSocio(this.fichasocieconomicaModel).subscribe(data=>{
      console.log("ficha 1 creada")
    });
    this.root.navigate(['vista-ficha'])
  }
  cargarDatos(){
    //datos persona
    this.personaService.getPorCedula(this.cedula_persona).subscribe(data =>{
      this.persona=data
      this.nombreCompleto = this.persona.nombres+" "+this.persona.apellidos
    })
  }
}
