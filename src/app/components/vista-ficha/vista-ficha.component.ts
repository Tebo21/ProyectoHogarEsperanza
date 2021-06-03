import { Component, OnInit } from '@angular/core';
import { Personas } from '../../models/personas';
import { RegistroFamiliares } from '../../models/registro-familiares';
import { FichaSocioeconomica } from '../../models/ficha-socioeconomica';
import { PersonasService } from '../../services/personas.service';
import { RegistroFamiliaresService } from '../../services/registro-familiares.service';
import { FichaSocioeconomicaService } from '../../services/ficha-socioeconomica.service';

@Component({
  selector: 'app-vista-ficha',
  templateUrl: './vista-ficha.component.html',
  styleUrls: ['./vista-ficha.component.css']
})
export class VistaFichaComponent implements OnInit {
  persona: Personas = new Personas();
  familiares: RegistroFamiliares = new RegistroFamiliares();
  nombreCompleto:String;
  fichaS: FichaSocioeconomica = new FichaSocioeconomica();
  public listaFamiliares:any = [];
  constructor(private personService:PersonasService, private famiservice:RegistroFamiliaresService, private fichaservice:FichaSocioeconomicaService){}
  nota1:string="Al momento de llenar este registro Fundación Hogar de Esperanza no garantiza"+
               " la entrega inmediata de la ayuda, ya que esto ingresa al departamento de trabajo"+
               " social y se dará prioridad a los más vulnerables."
  nota2:string="Estimado usuario, al firmar esta solicitud Ud. autoriza a la Fundación Hogar de"+
               " Esperanza a tomar fotografías en el instante de la entrega de la ayuda las mismas"+ 
               " que serán publicadas en nuestras páginas oficiales, precautelando siempre la integridad"+
               " de los menores de edad."
  
  ngOnInit(): void {
    this.cargarDatos();
    this.cargarFamilia();
    this.cargarFicha();
  }


  cargarDatos(){
    //datos persona
    var cedula_persona=localStorage.getItem('cedulalocalstorage');
    this.personService.getPorCedula("0104907943").subscribe(data =>{
      this.persona=data
      this.nombreCompleto = this.persona.nombres+" "+this.persona.apellidos
      console.log(data)
    })
  }

  cargarFamilia(){
    this.famiservice.getfamicedula("01010101").subscribe(data =>{
      this.familiares=data
      console.log(data)
      this.listaFamiliares=this.familiares.hijos;
    });
  }

  cargarFicha(){
    this.fichaservice.getfichacedula("01010101").subscribe(data=>{
      this.fichaS=data;
      console.log(data);
    })
  }

}
