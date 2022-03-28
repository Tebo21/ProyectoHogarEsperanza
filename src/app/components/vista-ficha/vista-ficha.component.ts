import { Component, OnInit } from '@angular/core';
import { Personas } from '../../models/personas';
import { RegistroFamiliares } from '../../models/registro-familiares';
import { FichaSocioeconomica } from '../../models/ficha-socioeconomica';
import { PersonasService } from '../../services/personas.service';
import { RegistroFamiliaresService } from '../../services/registro-familiares.service';
import { FichaSocioeconomicaService } from '../../services/ficha-socioeconomica.service';
import { Columns, PdfMakeWrapper, Table, Txt, Img, ITable } from 'pdfmake-wrapper';
import { Router } from '@angular/router';
import { AsistenciapersonaService } from 'src/app/services/asistenciapersona.service';
import { AsistenciaPersona } from 'src/app/models/asistenciapersona';
import { ObservacionesPersonas } from 'src/app/models/observaciones-personas';
import { ObservacionesPersonasService } from 'src/app/services/observaciones-personas.service';
type TableRow = [string, string, string, string, string, string];

@Component({
  selector: 'app-vista-ficha',
  templateUrl: './vista-ficha.component.html',
  styleUrls: ['./vista-ficha.component.css']
})
export class VistaFichaComponent implements OnInit {
 
  cedula: string;
  persona : Personas = {};
  ficha : FichaSocioeconomica = {};
  familiares : RegistroFamiliares[];
  asistencias : AsistenciaPersona[];
  observaciones: ObservacionesPersonas[];
  esposo: string = '';
  numHijos: number

  constructor(private personService: PersonasService, private famiservice: RegistroFamiliaresService, 
    private fichaservice: FichaSocioeconomicaService, private asistenciaService: AsistenciapersonaService,
    private Obserserivce: ObservacionesPersonasService, private router: Router) { }
  nota1: string = "Al momento de llenar este registro, la Fundación Hogar de Esperanza no garantiza" +
    " la entrega inmediata de la ayuda, ya que esto ingresa al departamento de trabajo" +
    " social y se dará prioridad a los más vulnerables."
  nota2: string = "Estimado usuario, al firmar esta solicitud usted autoriza a la Fundación Hogar de" +
    " Esperanza a tomar fotografías en el instante de la entrega de la ayuda las mismas" +
    " que serán publicadas en nuestras páginas oficiales, precautelando siempre la integridad" +
    " de los menores de edad."

  ngOnInit(): void {
    this.cedula = localStorage.getItem('cedulaEditar')
    this.familiares=[]
    this.asistencias=[]
    this.observaciones=[]
    this.cargarDatos();
  }
  
  cargarDatos() {
    this.personService.getUserByCedula(this.cedula).subscribe(data=>{
      this.persona = data;
    })
    this.fichaservice.getfichacedula(this.cedula).subscribe(data=>{
      this.ficha = data;
    })
    this.famiservice.getFamByCedula(this.cedula).subscribe(data=>{
      this.familiares = data;
      for (let index = 0; index < this.familiares.length; index++) {
        const element = this.familiares[index];
        if(element.parentesco == 'Esposo' || element.parentesco == 'Esposa'){
          this.esposo = element.nombreF+' '+element.apellidoF
        }
        this.numHijos = this.familiares[0].numHijos
      }
    })
    this.asistenciaService.getAsistenciaByCedula(this.cedula).subscribe(data=>{
      this.asistencias = data;
    })
    this.Obserserivce.getBycedula(this.cedula).subscribe(data => {
      this.observaciones = data;
    })
  }

  convertirBooleanos(bool : boolean) : string{
    if(bool == true){
      return 'Si'
    } else if (bool == false){
      return 'No'
    }
  }

  async generarPDF() {
    const pdf = new PdfMakeWrapper();
    pdf.defaultStyle({
      bold: false,
      fontSize: 10
    });  
    pdf.add(await new Img('../../assets/img/logo.png').build());
    pdf.add(new Txt("Ficha socioeconómica").bold().italics().alignment('center').end);
    pdf.add(pdf.ln(1))
    pdf.add(new Txt("Fecha de registro: " + this.ficha.fechaRegistro).italics().end);
    pdf.add(new Columns(["Cedula: " + this.persona.cedula,
    "Nombres: " + this.persona.nombres + ' ' + this.persona.apellidos]).columnGap(1).end);
    pdf.add(new Columns(["Direccion: " + this.persona.direccion]).columnGap(1).end);
    pdf.add(new Columns(["Telefono: " + this.persona.celular,
    "Nacionalidad: " + this.persona.nacionalidad]).columnGap(1).end);
    pdf.add(new Columns(["Correo electronico: " + this.persona.correo,
    "Edad: " + this.persona.edad]).columnGap(1).end);
    pdf.add(new Columns(["Discapacidad: " + this.convertirBooleanos(this.ficha.discapacidad),
    "Tipo discapacidad: " + this.ficha.tipo_discapacidad]).columnGap(1).end);
    pdf.add(new Columns(["Porcentaje de discapacidad intelectual: " + this.ficha.porc_disc_mental+'%',
    "Porcentaje de discapacidad física: " + this.ficha.porc_disc_fisica+'%']).columnGap(1).end);
    pdf.add(new Columns(["Descripción de discapacidad intelectual: " + this.ficha.descrip_disc_mental,
    "Descripción de discapacidad física: " + this.ficha.descrip_disc_fisica]).columnGap(1).end);
    pdf.add(new Columns(["Adulto mayor: " + this.convertirBooleanos(this.ficha.adultoMayor),
    "Estado civil: " + this.persona.estado_civil]).columnGap(1).end);
    pdf.add(new Columns(["Pareja: " + this.convertirBooleanos(this.ficha.pareja),
    "Numero de familiares: " + this.familiares.length]).columnGap(1).end);
    pdf.add(new Columns(["Vive con otros: " + this.convertirBooleanos(this.ficha.viveConOtros),
    "Situacion economica: " + this.ficha.situacionEconomica]).columnGap(1).end);
    pdf.add(new Columns(["Seguro: " + this.convertirBooleanos(this.ficha.seguro),
    "Salario: " + this.ficha.salario]).columnGap(1).end);
    pdf.add(new Columns(["Recibe bono: " + this.convertirBooleanos(this.ficha.recibebono),
    "Cantidad que recibe por bono: " + this.ficha.cantidadbono]).columnGap(1).end);
    pdf.add(new Columns(["Tipo de vivienda: " + this.ficha.tipoVivienda,
    "Descripcion de la vivienda: " + this.ficha.descripcionVivienda]).columnGap(1).end);
    pdf.add(new Columns(["Esposa/Esposo: " + this.esposo,
    "Madre soltera: " + this.convertirBooleanos(this.ficha.madreSoltera)]).columnGap(1).end);
    pdf.add(new Columns([,
    ]).columnGap(1).end);
    pdf.add(pdf.ln())
    pdf.add(new Txt("FAMILIARES").bold().italics().end);
    pdf.add(this.creaTabla(this.familiares));
    pdf.add(pdf.ln())
    pdf.add(new Txt("NOTAS:").bold().italics().end);
    pdf.add(new Txt(this.nota1).italics().end);
    pdf.add(pdf.ln())
    pdf.add(new Txt(this.nota2).italics().end);
    pdf.add(pdf.ln(1.5))
    pdf.add(new Txt("¿Está usted de acuerdo?     Si..........  No..........").italics().end);
    pdf.add(pdf.ln(3))
    pdf.add(new Txt("_________________________                 _________________________").italics().alignment('center').end);
    pdf.add(new Txt("Entrevistado                                   Entrevistador      ").italics().alignment('center').end);
    pdf.add(pdf.ln(1))
    pdf.add(new Txt("Datos específicos para la entrega de ayuda").bold().italics().alignment('center').end);
    pdf.add(pdf.ln())
    pdf.add(new Txt("1.¿Cómo califica la actitud del entrevistado?").italics().end);
    pdf.add(pdf.ln())
    pdf.add(new Txt("Muy buena..........     Buena..........     Agradable..........    Nada agradable..........").italics().end);
    pdf.add(pdf.ln())
    pdf.add(new Txt("2.¿Recomienda la entrega de ayuda?").italics().end);
    pdf.add(pdf.ln())
    pdf.add(new Txt("..............................................................................................................................................................................................").italics().end);
    pdf.add(pdf.ln())
    pdf.add(new Txt("3.Notas extra").italics().end);
    pdf.add(pdf.ln(1))
    pdf.add(new Txt("..............................................................................................................................................................................................").italics().end);
    pdf.add(pdf.ln())
    pdf.add(new Txt("4.Fecha de entrega de ayuda").italics().end);
    pdf.add(pdf.ln())
    pdf.add(new Txt("..............................................................................................................................................................................................").italics().end);
    pdf.create().open();
  }

  creaTabla(data: RegistroFamiliares[]): ITable {
    [{}];
    return new Table([
      ['Cédula', 'Parentesco', 'Nombres', 'Apellidos', 'Celular', 'Correo'],
      ...this.extraerDatos(data),
    ])
      //.widths([52, 80, 60, 60, 30, 100])
      .heights((rowIndex) => {
        return rowIndex === 0 ? 18 : 0;
      })
      .layout({
        fillColor: (rowIndex: number, node: any, columnIndex: number) => {
          return rowIndex === 0 ? '#CCCCCC' : '';
        },
      }).end;
  }
  
  extraerDatos(data: RegistroFamiliares[]): TableRow[] {
    return data.map((row) => [
      row.cedulaFamiliar,
      row.parentesco,
      row.nombreF,
      row.apellidoF,
      row.celularF,
      row.correo
    ]);
  }

  cancelar() {
    this.router.navigate(['/lista-beneficiarios']);
  }

}