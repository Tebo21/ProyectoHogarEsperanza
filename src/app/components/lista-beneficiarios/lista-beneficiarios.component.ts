import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Img, Txt, Table } from 'pdfmake-wrapper';
import { FichaSocioeconomica } from '../../models/ficha-socioeconomica';
import { Personas } from '../../models/personas';
import { PersonasService } from '../../services/personas.service';
import { FichaSocioeconomicaService } from '../../services/ficha-socioeconomica.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { RegistroFamiliaresService } from 'src/app/services/registro-familiares.service';
import { RegistroFamiliares } from 'src/app/models/registro-familiares';

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
  constructor(private personaService:PersonasService, private fichaService:FichaSocioeconomicaService, private famiService:RegistroFamiliaresService,private root:Router) { }

  ngOnInit(): void {
    this.datos=[]
    this.personaArray=[]
    this.cedulaArray=[]
    this.familiaArray=[]
    this.fichaArray=[]
  this.listaPersona();
  this.listaFamiliares();
  }

  actualizar(){
  this.listaPersona();
  this.listaFamiliares();
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
            totalHijos=numeroHIJOS+1
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
      }
    });
          }
        }
      }
    });
    console.log("listo")
  } 
  
  ingresoFicha(i){
    localStorage.setItem("cedulalocalstorage", i)
    this.root.navigate(['vista-ficha']);
  }

    ingresoeditar(i){
    localStorage.setItem("cedulalocalstorage", i)
    this.root.navigate(['editar-beneficiarios']);
  }

  extractData(){
    return this.datos.map(row =>[row.cedula,row.nombres,row.apellidos,row.direccion,row.celular,row.correo,row.fechaNacimiento,row.edad,row.numeroFamiliares,row.numeroHijos,
    row.tipovivienda,row.seguro,row.discapacidad,row.nacionalidad,row.estacoCIVIL,row.salario,row.fecha,row.adulto,row.viveConOTROS])
  }
  
  async generarPDF(){
    console.log(this.extractData())
    const pdf = new PdfMakeWrapper();
    pdf.add(await new Img('../../assets/img/logo.png').build());
    pdf.add(new Txt("Reporte Beneficiarios").bold().italics().alignment('center').end);
    pdf.add(pdf.ln(3))
    pdf.add(new Table([
      ['Cedula','Nombres','Apellidos','Dirección','Celular','Correo','Fecha Nacimiento','Edad'
      ,'Numero Familiares','Numero Hijos','Tipo Vivienda','Seguro','Discapacidad','Nacionalidad','Estado Civil'
      ,'Salario','Fecha Registro','Adulto Mayor','Vive con Otros'],
      ...this.extractData()
    ]).widths('*').layout({
      fillColor:(rowIndex:number, node:any, columnIndex:number)=>{
        return rowIndex === 0 ? '#CCCCCC': '';
      }
    }).end)
    pdf.create().open();   
  }
  eliminarPersonaBeneficiario(i){
   this.personaService.getPorCedula(i).subscribe( data => {
     this.persona=data
     this.persona.beneficiario=false;
     this.persona.estadoActivo=false;
     console.log(this.persona)
     this.personaService.updatePersona(this.persona).subscribe( data => {
                 Swal.fire(
        'Eliminado!',
        'Registro eliminado',
        'success'
      )
     })
   }) 
  }  
}
