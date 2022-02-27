import { Component, OnInit } from '@angular/core';
import { ObservacionesPersonas } from 'src/app/models/observaciones-personas';
import { ObservacionesPersonasService } from 'src/app/services/observaciones-personas.service';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { PdfMakeWrapper, Txt, Img, Table } from 'pdfmake-wrapper';
import { PersonasService } from '../../services/personas.service';
import { Personas } from '../../models/personas';
import { DonaProductoService } from '../../services/dona-producto.service';

@Component({
  selector: 'app-observaciones-personas',
  templateUrl: './observaciones-personas.component.html',
  styleUrls: ['./observaciones-personas.component.css']
})
export class ObservacionesPersonasComponent implements OnInit {
  notasObservaciones: ObservacionesPersonas=new ObservacionesPersonas()
  datosob:any;
  datos:any=[];
  nombrePersona:String;
  fechaActual = new Date();
  persona: Personas = new Personas();
  cedula_persona:string = localStorage.getItem('cedulalocalstorage');
  constructor(private Obserserivce:ObservacionesPersonasService, private personaservice:PersonasService) { }
  
  ngOnInit(): void {
    this.listaObservaciones();
    this.getPersona();
  }


  guardarObservaciones(){
    let mes = this.fechaActual.getMonth()+1
    let fechahoy = this.fechaActual.getFullYear()+"/"+mes+"/"+this.fechaActual.getDate();
    let fechaActual2 = new Date(fechahoy);
    let fecha= formatDate(fechaActual2, 'yyyy-MM-dd ', 'en-ECU', '+0593');
    this.notasObservaciones.cedulaPersona=this.cedula_persona
    this.notasObservaciones.fechaRegistro=fecha+"";
    this.Obserserivce.postObservacion(this.notasObservaciones).subscribe(data =>{
    });
    Swal.fire({
      title: 'Observación Registrada'
    });
    this.notasObservaciones.descripcionobservacion=""
    this.listaObservaciones()
  }

  listaObservaciones(){
    this.notasObservaciones.cedulaPersona=this.cedula_persona
    this.Obserserivce.getBycedula(this.notasObservaciones.cedulaPersona).subscribe(data =>{
        for(let c in data){ 
           const datosLista={
            idObservacionesPersona:data[c].idObservacionesPersona,
            fechaRegistro:data[c].fechaRegistro.substring(0,10),
            descripcionobservacion:data[c].descripcionobservacion
            }
            this.datos.push(datosLista)
        }
    })
  }
  actualizar(){
    this.datos=[]
    this.listaObservaciones();
  }

  getPersona(){
    this.personaservice.getUserByCedula(this.cedula_persona).subscribe(data => {
      this.persona=data
      this.nombrePersona=this.persona.nombres;
    })
  }

  extractData(){
    return this.datos.map(row =>[row.idObservacionesPersona,row.fechaRegistro,row.descripcionobservacion])
  }
  
  async generarPDF(){
    const pdf = new PdfMakeWrapper();
    pdf.add(await new Img('../../assets/img/logo.png').build());
    pdf.add(new Txt("Reporte Observaciones").bold().italics().alignment('center').end);
    pdf.add(pdf.ln(3))
    pdf.add(new Txt("Cedula:"+this.cedula_persona).bold().italics().alignment('center').end);
    pdf.add(new Txt("Nombre:"+this.nombrePersona).bold().italics().alignment('center').end);
    pdf.add(pdf.ln(3))
    pdf.add(new Table([
      ['#','Fecha','Observacion'],
      ...this.extractData()
    ]).widths('*').layout({
      fillColor:(rowIndex:number, node:any, columnIndex:number)=>{
        return rowIndex === 0 ? '#CCCCCC': '';
      }
    }).end)
    pdf.create().open();   
  }

  optenerDatos(event:any){
    this.datosob=event.target.value;
  }

  actualizarObservacion(id,fecha){
    this.notasObservaciones.idObservacionesPersona=id
    this.notasObservaciones.cedulaPersona=this.cedula_persona
    this.notasObservaciones.fechaRegistro=fecha
    this.notasObservaciones.descripcionobservacion=this.datosob
    this.Obserserivce.updateFamiliares(this.notasObservaciones).subscribe(data =>{
      alert("Observación actualizada")
    });
  }
}
