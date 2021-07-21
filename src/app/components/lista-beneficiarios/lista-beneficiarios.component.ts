import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { PdfMakeWrapper, Img, Txt, Table } from 'pdfmake-wrapper';
import { FichaSocioeconomica } from '../../models/ficha-socioeconomica';
import { Personas } from '../../models/personas';
import { PersonasService } from '../../services/personas.service';
import { FichaSocioeconomicaService } from '../../services/ficha-socioeconomica.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { RegistroFamiliaresService } from 'src/app/services/registro-familiares.service';
import { RegistroFamiliares } from 'src/app/models/registro-familiares';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-lista-beneficiarios',
  templateUrl: './lista-beneficiarios.component.html',
  styleUrls: ['./lista-beneficiarios.component.css']
})
export class ListaBeneficiariosComponent implements OnInit {
  ficha: FichaSocioeconomica = new FichaSocioeconomica();
  familia: RegistroFamiliares = new RegistroFamiliares();
  persona: Personas = new Personas();
  public datos:any =[];
  public personaArray:any = [];
  public cedulaArray:any = [];
  public familiaArray:any = [];
  public fichaArray:any = [];
  public arraySelected:any=[];
  public arrayExcel:any=[]
  constructor(private personaService:PersonasService, private fichaService:FichaSocioeconomicaService, private famiService:RegistroFamiliaresService,private root:Router) { }

  ngOnInit(): void {
    this.datos=[]
    this.personaArray=[]
    this.cedulaArray=[]
    this.familiaArray=[]
    this.fichaArray=[]
  this.listaPersona();
  this.listaFamiliares();
  this.optenerlista();
  this.actualizar();
  }

  actualizar(){
    this.datos=[]
  this.listaPersona();
  this.listaFamiliares();
  this.optenerlista();
  }

  listaPersona(){
  this.personaService.getPersona().subscribe(data =>{
      for(let i in data){
        this.persona=data[i];
        if(this.persona.beneficiario==true){
          this.cedulaArray.push(this.persona.cedula)
          this.personaArray.push([this.persona.cedula, this.persona.nombres, 
          this.persona.apellidos, this.persona.direccion, this.persona.celular, 
          this.persona.correo, this.persona.fechaNacimiento, this.persona.edad])
          for(var l = this.cedulaArray.length -1; l >=0; l--){
            if(this.cedulaArray.indexOf(this.cedulaArray[l]) !== l) this.cedulaArray.splice(l,1);
          }
          for(var l = this.personaArray.length -1; l >=0; l--){
            if(this.personaArray.indexOf(this.personaArray[l]) !== l) this.personaArray.splice(l,1);
          }
        }
      }
     });
  }
  listaFamiliares(){
      this.famiService.getFami().subscribe(data =>{
      for(let i in this.cedulaArray){
        for(let j in data){
          var numeroHIJOS=0;
          var totalHijos=0;
          this.persona.cedula=this.cedulaArray[i];
          this.familia=data[j]
          if(this.persona.cedula==this.familia.cedulaPersona){
        for(let i in this.familia.hijos){
          if(this.familia.hijos[i][8]=="Hijo" || this.familia.hijos[i][8]=="Hija"){
            numeroHIJOS=1+numeroHIJOS
            totalHijos=numeroHIJOS
          }
          } 
            this.familiaArray.push([this.familia.numHijos+"",totalHijos+" hijos"])
          for(var l = this.familiaArray.length -1; l >=0; l--){
            if(this.familiaArray.indexOf(this.familiaArray[l]) !== l) this.familiaArray.splice(l,1);
          }
 this.fichaService.getficha().subscribe(data =>{
    for(let c in this.cedulaArray){
       for(let f in data){
        this.persona.cedula=this.cedulaArray[c];
        this.ficha=data[f];
        if(this.persona.cedula==this.ficha.cedulaPersona){
          var discapacidad;
          var adultoMayor;
          var ViveOtros;
          if(this.ficha.discapacidad=="true"){
            discapacidad="Si"
          }else{
            discapacidad="No"
          }
          if(this.ficha.adultoMayor==true){
            adultoMayor="Si"
          }else{
            adultoMayor="No"
          }
          if(this.ficha.viveConOtros==true){
            ViveOtros="Si"
          }else{
            ViveOtros="No"
          }
        this.fichaArray.push([this.ficha.tipoVivienda, 
         this.ficha.seguro, discapacidad, this.ficha.nacionalidad, 
         this.ficha.estadoCivil, this.ficha.salario, this.ficha.fechaRegistro.substring(0,10), 
         adultoMayor, ViveOtros])
         this.personaArray[c].push(this.familiaArray[c][0],this.familiaArray[c][1])
         this.personaArray[c].push(this.fichaArray[c][0],this.fichaArray[c][1],
         this.fichaArray[c][2],this.fichaArray[c][3],this.fichaArray[c][4],
         this.fichaArray[c][5],this.fichaArray[c][6],this.fichaArray[c][7],this.fichaArray[c][8])
        }
       }
      }
    });
          }
        }
      }
    });  
    console.log("listo")
  } 

  optenerlista(){
    console.log(this.personaArray)
    for(let c in this.cedulaArray){
    const datosLista={
      cedula:this.personaArray[c][0], 
      nombres:this.personaArray[c][1],
      apellidos:this.personaArray[c][2],
      direccion:this.personaArray[c][3],
      celular:this.personaArray[c][4],
      correo:this.personaArray[c][5],
      fechaNacimiento:this.personaArray[c][6],
      edad:this.personaArray[c][7],
      numeroFamiliares:this.personaArray[c][8],
      numeroHijos:this.personaArray[c][9],
      tipovivienda:this.personaArray[c][10],
      seguro:this.personaArray[c][11],
      discapacidad:this.personaArray[c][12],
      nacionalidad:this.personaArray[c][13],
      estacoCIVIL:this.personaArray[c][14],
      salario:this.personaArray[c][15],
      fecha:this.personaArray[c][16],
      adulto:this.personaArray[c][17],
      viveConOTROS:this.personaArray[c][18]
    }
    if(this.datos.length<this.cedulaArray.length){
      this.datos.push(datosLista)
     }
    }  
  }
  
  ingresoFicha(i){
    localStorage.setItem("cedulalocalstorage", i)
    this.root.navigate(['vista-ficha']);
  }

    ingresoeditar(i){
    localStorage.setItem("cedulalocalstorage", i)
    this.root.navigate(['editar-beneficiarios']);
  }

  extractData(datosTabla){
    return datosTabla.map(row =>[row.cedula,row.nombres,row.apellidos,row.celular,row.fechaNacimiento,row.edad,row.numeroHijos,
    row.tipovivienda,row.seguro,row.discapacidad,row.nacionalidad,row.estacoCIVIL,row.fecha,row.adulto])
  }
  async generarPDFSelected(){
    if (this.arraySelected.length < 1) {
      alert('Por favor seleccione al menos un usuario')
    } else {
    const pdf = new PdfMakeWrapper();
    pdf.pageOrientation('landscape')
    pdf.pageSize('A3')
    pdf.add(await new Img('../../assets/img/logo.png').build());
    pdf.add(new Txt("Reporte Beneficiarios").bold().italics().alignment('center').end);
    pdf.add(pdf.ln(3))
    pdf.add(new Table([
      ['Cedula','Nombres','Apellidos','Celular','Fecha Nacimiento','Edad'
      ,'Numero Hijos','Tipo Vivienda','Seguro','Discapacidad','Nacionalidad','Estado Civil'
      ,'Fecha Registro','Adulto Mayor'],
      ...this.extractData(this.arraySelected)
    ]).widths('*').layout({
      fillColor:(rowIndex:number, node:any, columnIndex:number)=>{
        return rowIndex === 0 ? '#CCCCCC': '';
      }
    }).end)
    pdf.create().open();
  }   
  }
  async generarPDF(){
    const pdf = new PdfMakeWrapper();
    pdf.pageOrientation('landscape')
    pdf.pageSize('A3')
    pdf.add(await new Img('../../assets/img/logo.png').build());
    pdf.add(new Txt("Reporte Beneficiarios").bold().italics().alignment('center').end);
    pdf.add(pdf.ln(3))
    pdf.add(new Table([
      ['Cedula','Nombres','Apellidos','Celular','Fecha Nacimiento','Edad'
      ,'Numero Hijos','Tipo Vivienda','Seguro','Discapacidad','Nacionalidad','Estado Civil'
      ,'Fecha Registro','Adulto Mayor'],
      ...this.extractData(this.datos)
    ]).widths('*').layout({
      fillColor:(rowIndex:number, node:any, columnIndex:number)=>{
        return rowIndex === 0 ? '#CCCCCC': '';
      }
    }).end)
    pdf.create().open();   
  }
  exportSelectedX() {
    if (this.arraySelected.length < 1) {
      alert('Por favor seleccione al menos un usuario')
    } else {
      for (let i = 0; i < this.arraySelected.length; i++) {
        let nuevoUserE = this.arraySelected[i];
        const usuarioImprimirSelected = {
          cedula:nuevoUserE.cedula, 
           nombres:nuevoUserE.nombres,
           apellidos:nuevoUserE.apellidos,
           direccion:nuevoUserE.direccion,
           celular:nuevoUserE.celular,
           correo:nuevoUserE.correo,
           fechaNacimiento:nuevoUserE.fechaNacimiento,
           edad:nuevoUserE.edad,
           numeroFamiliares:nuevoUserE.numeroFamiliares,
           numeroHijos:nuevoUserE.numeroHijos,
           tipovivienda:nuevoUserE.tipovivienda,
           seguro:nuevoUserE.seguro,
           discapacidad:nuevoUserE.discapacidad,
           nacionalidad:nuevoUserE.nacionalidad,
           estacoCIVIL:nuevoUserE.estacoCIVIL,
           salario:nuevoUserE.salario,
           fecha:nuevoUserE.fecha,
           adulto:nuevoUserE.adulto,
           viveConOTROS:nuevoUserE.viveConOTROS
        }
        this.arrayExcel.push(usuarioImprimirSelected);
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.arrayExcel);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "Usuarios");
      });
    }

  }
  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.datos);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Usuarios");
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    location.reload();
  }
  eliminarPersonaBeneficiario(i){
   this.personaService.getPorCedula(i).subscribe( data => {
     this.persona=data
   //INICIO
var elimianar
Swal.fire({
  title: 'Esta seguro de eliminar al beneficiario',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Aceptar'
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire(
      'Eliminado!',
      'Beneficiario eliminado',
      'success'
    )
    elimianar=true;
    var verificacion=elimianar
    if (verificacion==true){ 
     this.persona.beneficiario=false;
     this.persona.estadoActivo=false;
     this.personaService.updatePersona(this.persona).subscribe( data => {
     })
      window.location.reload();
    }
  }
});
   })
  }  
}
