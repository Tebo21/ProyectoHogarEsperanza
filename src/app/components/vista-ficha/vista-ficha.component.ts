import { Component, OnInit } from '@angular/core';
import { Personas } from '../../models/personas';
import { RegistroFamiliares } from '../../models/registro-familiares';
import { FichaSocioeconomica } from '../../models/ficha-socioeconomica';
import { PersonasService } from '../../services/personas.service';
import { RegistroFamiliaresService } from '../../services/registro-familiares.service';
import { FichaSocioeconomicaService } from '../../services/ficha-socioeconomica.service';
import { Columns, DocumentDefinition, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';

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
  pareja:string;
  discapacidad:string;
  adultoMayor:String;
  viveConOtros:String;
  NomParejaArray:any=[];
  NomPareja:string;
  cedula_persona:string = localStorage.getItem('cedulalocalstorage');
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
    this.cargarFamilia();
    this.cargarDatos();
    this.cargarFicha();
  }

  /*
    var index2 = this.familiares.hijos.indexOf(this.familiares.hijos.find(x => x[8] == "Primo"));
     console.log(this.listaFamiliares(index2,1))
*/
  cargarDatos(){
    //datos persona
    this.personService.getPorCedula(this.cedula_persona).subscribe(data =>{
      this.persona=data
      this.nombreCompleto = this.persona.nombres+" "+this.persona.apellidos
      if(this.persona.discapacidad==true){
        this.discapacidad="Si"
      }else{
        this.discapacidad="No"
      }
    })
  }

  cargarFamilia(){
    this.famiservice.getfamicedula(this.cedula_persona).subscribe(data =>{
      this.familiares=data
      this.listaFamiliares=this.familiares.hijos;
      var index2 = this.listaFamiliares.indexOf(this.listaFamiliares.find(x => x[8] == "Esposo/a"));
      this.NomParejaArray = this.listaFamiliares[index2]
      this.NomPareja=this.NomParejaArray[1]+" "+this.NomParejaArray[2]
    });
  }

  cargarFicha(){
    this.fichaservice.getfichacedula(this.cedula_persona).subscribe(data=>{
      this.fichaS=data;
      this.fichaS.fechaRegistro
      if(this.fichaS.adultoMayor==true){
          this.adultoMayor="Si"
      }else{
        this.adultoMayor="No"
      }
      if(this.fichaS.viveConOtros==true){
        this.viveConOtros="Si"
    }else{
      this.viveConOtros="No"
    }
    })
  }
  extractData(){
    return this.listaFamiliares.map(row =>[row[0],row[1]+" "+row[2],row[6],row[7],row[8]])
  }
  generarPDF(){
    const pdf = new PdfMakeWrapper();
    pdf.add(new Txt("Hoja de Registro").bold().italics().alignment('center').end);
    pdf.add(pdf.ln(3))
    pdf.add(new Txt("FECHA: "+((document.getElementById("fecha") as HTMLInputElement).value)).italics().end);
    pdf.add(new Txt("NOMBRES: "+((document.getElementById("Nombres") as HTMLInputElement).value)).italics().end);
    pdf.add(new Txt("DIRECCIÓN EXACTA: "+((document.getElementById("Direccion") as HTMLInputElement).value)).italics().end);
    pdf.add(new Txt("TELEFONO: "+((document.getElementById("Telefono") as HTMLInputElement).value)).italics().end);
    pdf.add(new Txt("NACIONALIDAD: "+((document.getElementById("Nacionalidad") as HTMLInputElement).value)).italics().end);
    pdf.add(pdf.ln())
    pdf.add(new Columns(["DISCAPACIDAD: "+((document.getElementById("Discapacidad") as HTMLInputElement).value),
                         "ADULTOS MAYORES: "+((document.getElementById("AdultosM") as HTMLInputElement).value),
                         "ESTADO CIVIL: "+((document.getElementById("EstadoC") as HTMLInputElement).value)]).columnGap(1).end);
    pdf.add(pdf.ln())
    pdf.add(new Txt("Nro. INTEGRANTES DE FAMILIA: "+((document.getElementById("NoIntegrantes") as HTMLInputElement).value)).italics().end);
    pdf.add(new Txt("NOMBRES DE LA PAREJA O ESPOSO/A: "+((document.getElementById("NomPareja") as HTMLInputElement).value)).italics().end);
                       
    pdf.add(pdf.ln())
    pdf.add(new Txt("NOMBRE Y EDAD DE LOS FAMILIARES").bold().italics().end);
    pdf.add(new Table([
      ['Cedula','Nombres','Edad','Genero','Parentesco'],
      ...this.extractData()
    ]).widths('*').layout({
      fillColor:(rowIndex:number, node:any, columnIndex:number)=>{
        return rowIndex === 0 ? '#CCCCCC': '';
      }
    }).end)
    pdf.add(pdf.ln())
    pdf.add(new Txt("¿VIVE CON OTROS FAMILIARES?").bold().italics().end);
    pdf.add(new Txt(((document.getElementById("ViveFami") as HTMLInputElement).value)).italics().end);
    pdf.add(pdf.ln())
    pdf.add(new Txt("SITUACIÓN ECONÓMICA").bold().italics().end);
    pdf.add(new Txt(((document.getElementById("SituEcono") as HTMLInputElement).value)).italics().end);
    pdf.add(pdf.ln())
    pdf.add(new Txt("¿POSEE VIVIENDA PROPIA O ALQUILADA?").bold().italics().end);
    pdf.add(new Txt(((document.getElementById("ViviPro") as HTMLInputElement).value)).italics().end);
    pdf.add(pdf.ln())
    pdf.add(new Txt("NOTAS:").bold().italics().end);
    pdf.add(new Txt(((document.getElementById("Notas1") as HTMLInputElement).value)).italics().end);
    pdf.add(pdf.ln())
    pdf.add(new Txt(((document.getElementById("Notas2") as HTMLInputElement).value)).italics().end);
    pdf.add(pdf.ln(2))
    pdf.add(new Txt("Acepta     SI..........  NO..........").italics().end);
    pdf.add(pdf.ln(4))
    pdf.add(new Txt("_________________________________              _______________________________________").italics().alignment('center').end);
    pdf.add(new Txt("Entrevistado/usuario                           Entrevistador/representante de la organización").italics().alignment('center').end);    
    pdf.add(pdf.ln(8))
    pdf.add(new Txt("DATOS ESPECIFICOS PARA LA ENTREG DE AYUDA.(Esto llena el entrevistador según criterio)").italics().end);
    pdf.add(pdf.ln())
    pdf.add(new Txt("1.¿CÓMO CALIFICA LA ACTITUD DEL ENTREVISTADOR?").italics().end);    
    pdf.add(pdf.ln())
    pdf.add(new Txt("BUENA..........MUY BUENA..........POCO AGRADABLE..........NADA AGRADABLE..........").italics().end);    
    pdf.add(pdf.ln())
    pdf.add(new Txt("2.¿RECOMIENDA LA ENTREGA DE AYUDA?").italics().end);    
    pdf.add(pdf.ln())
    pdf.add(new Txt("......................................................................................................................................................................").italics().end);    
    pdf.add(pdf.ln())
    pdf.add(new Txt("3.OTRAS NOTAS").italics().end);   
    pdf.add(pdf.ln())
    pdf.add(new Txt(((document.getElementById("NotasExtras") as HTMLInputElement).value)).italics().end);
    pdf.add(pdf.ln())
    pdf.add(new Txt("4.FECHA DE ENTREGA DE AYUDA").italics().end);
    pdf.add(pdf.ln())
    pdf.add(new Txt("......................................................................................................................................................................").italics().end);    
     
    
    pdf.create().open();   
  }
}