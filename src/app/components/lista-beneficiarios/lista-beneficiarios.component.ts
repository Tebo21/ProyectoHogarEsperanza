import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Img, Txt, Table } from 'pdfmake-wrapper';
import { FichaSocioeconomica } from '../../models/ficha-socioeconomica';
import { Personas } from '../../models/personas';
import { PersonasService } from '../../services/personas.service';
import { FichaSocioeconomicaService } from '../../services/ficha-socioeconomica.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-beneficiarios',
  templateUrl: './lista-beneficiarios.component.html',
  styleUrls: ['./lista-beneficiarios.component.css']
})
export class ListaBeneficiariosComponent implements OnInit {
  ficha: FichaSocioeconomica = new FichaSocioeconomica();
  persona: Personas = new Personas();
  public personaArray:any = [];
  public cedulaArray:any = [];
  public datosArray:any = [];
  public fichaArray:any = [];
  constructor(private personaService:PersonasService, private fichaService:FichaSocioeconomicaService, private root:Router) { }

  ngOnInit(): void {
  this.listaPersona();
  }

  actualizar(){
    this.listaPersona();
  }

  listaPersona(){
    this.fichaService.getficha().subscribe(data =>{
      for(let i in data){
        this.ficha=data[i];
        this.fichaArray.push([this.ficha.fechaRegistro.substring(0,10)])
        this.cedulaArray.push(this.ficha.cedulaPersona)
      }    
      });
    this.personaService.getPersona().subscribe(data =>{
      for(let i in this.cedulaArray){
        for(let j in data){
          this.persona=data[j];
          if(this.cedulaArray[i]==this.persona.cedula){
            this.personaArray.push([this.persona.cedula, this.persona.nombres+" "+this.persona.apellidos, this.persona.genero, this.fichaArray[i]])
          }
        }
      }
    });
  }
 
  ingresoFicha(i){
    localStorage.setItem("cedulalocalstorage", i)
    this.root.navigate(['vista-ficha']);
    console.log(i)
  }

  extractData(){
    console.log(this.personaArray)
    return this.personaArray.map(row =>[row[0],row[1],row[2],row[3]])
  }

  async generarPDF(){
    const pdf = new PdfMakeWrapper();
    pdf.add(await new Img('../../assets/img/logo.png').build());
    pdf.add(new Txt("Reporte Beneficiarios").bold().italics().alignment('center').end);
    pdf.add(pdf.ln(3))
    pdf.add(new Table([
      ['Cedula','Nombres','Genero','Fecha Registro'],
      ...this.extractData()
    ]).widths('*').layout({
      fillColor:(rowIndex:number, node:any, columnIndex:number)=>{
        return rowIndex === 0 ? '#CCCCCC': '';
      }
    }).end)
    pdf.create().open();   
  }


}
