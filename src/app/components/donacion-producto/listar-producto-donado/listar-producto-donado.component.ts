import { Component, OnInit } from '@angular/core';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import { Personas } from 'src/app/models/personas';
import { PdfMakeWrapper, Txt, Img, Table } from 'pdfmake-wrapper';
import { EntregarDonacionService } from 'src/app/services/entregar-donacion.service';
import { PersonasService } from 'src/app/services/personas.service';
import { EntregaDonacion } from 'src/app/models/EntregaDonacion';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

type TableRow3 = [string, string, string, string, number, string];
@Component({
  selector: 'app-listar-producto-donado',
  templateUrl: './listar-producto-donado.component.html',
  styleUrls: ['./listar-producto-donado.component.css']
})
export class ListarProductoDonadoComponent implements OnInit {
    //Persona
    Persona: Personas = {};
    ListadoPersonas: Personas[];

   //Beneficiarios DTO   
   entregas: Array<Beneficiarios2>; 
   entregasFiltradas: Array<Beneficiarios2> = [];

   //Entregas  
   listaEntrega: EntregaDonacion[];

   //Tabla carga
  loading: boolean = true;

  tipoUser: any;

  constructor(
    private entregarDonacionService: EntregarDonacionService,
    private personaService: PersonasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ComprobarLogin();
    this.entregas = [];
    this.ListadoPersonas = [];
    this.listarBeneficiarioConNombres();
  }

  ComprobarLogin() {
    this.tipoUser = localStorage.getItem('rolUser');
    if (this.tipoUser == 1) {
    } else if (this.tipoUser == 2 || this.tipoUser == 3 || this.tipoUser == 4) {
      Swal.fire({
        title: 'No tiene permisos para visualizar el historial de entregas de donaciones',
        icon: 'warning',
      });
      this.router.navigateByUrl('inicio-super-admin');
    } else {
      Swal.fire({
        title: 'Por favor inicie sesión primero',
        icon: 'error',
      });
      this.router.navigateByUrl('login');
    } 
  }

  onFilter(event, dt) {
    this.entregasFiltradas = [];
    this.entregasFiltradas = event.filteredValue;
  }

  showConfirmacionPDF(){
    Swal.fire({
      title: '¿Estas seguro de descargar este reporte?',
      text: "Se abrira una visualizacion de su reporte",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, descargar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.crearReporte();
        Swal.fire(
          'Descargado!',
          'El registro ha sido descargado',
          'success'
        )
      }
    })
  }


  listarBeneficiarioConNombres(){
    this.entregarDonacionService.getEntregas().subscribe(data =>{
      this.listaEntrega = data;
      for(let i = 0; i < this.listaEntrega.length; i++){
        this.personaService.getUserByCedula(this.listaEntrega[i].cedulaBeneficiario).subscribe(data2 =>{
          this.Persona = data2
          this.ListadoPersonas.push(this.Persona)
          const usuarioImprimir: Beneficiarios2 = {
            cedula: this.Persona.cedula,
            nombres: this.Persona.nombres + ' ' + this.Persona.apellidos,           
            productoEntregado: this.listaEntrega[i].productoEntregado,
            descripcionProducto: this.listaEntrega[i].descripcionProducto,
            cantidadEntregada: this.listaEntrega[i].cantidadEntregada,
            fechaEntrega: this.listaEntrega[i].fechaEntrega

          }
          this.entregas.push(usuarioImprimir);
        })
      }

      this.loading = false;
    })
  }
  
  async crearReporte() {
    const pdf = new PdfMakeWrapper();
    pdf.pageOrientation('landscape');
    pdf.pageSize('A4');
    pdf.info({
      title: 'Reporte de productos entregados a los beneficiarios',
    });
    pdf.add(await new Img('../../assets/img/logo.png').build());   
    pdf.add(new Txt('   ').end);
    pdf.add(
      new Txt('Lista de productos entregados a los beneficiarios').alignment('center').bold().fontSize(16).end
    );
    pdf.add(new Txt('   ').end);
    if(this.entregasFiltradas.length > 0){
      pdf.add(this.creaTabla(this.entregasFiltradas));
    }else{
      pdf.add(this.creaTabla(this.entregas));
    } 
    pdf.footer('hola');
   
    pdf.create().open();
  }
  



  creaTabla(data: Beneficiarios2[]): ITable {
    [{}];
    return new Table([
      ['Cédula', 'Nombres', 'Producto', 'Descripción', 'Cantidad', 'Fecha'],
      ...this.extraerDatos3(data),
    ])
    .widths([85, 140, 130, 100, 142, 110])
      .heights((rowIndex) => {
        return rowIndex === 0 ? 20 : 0;
      })
      .layout({
        fillColor: (rowIndex: number, node: any, columnIndex: number) => {
          return rowIndex === 0 ? '#CCCCCC' : '';
        },
      }).end;
  }
  extraerDatos3(data: Beneficiarios2[]): TableRow3[] {
    return data.map((row) => [
      row.cedula,
      row.nombres,
      row.productoEntregado,
      row.descripcionProducto,
      row.cantidadEntregada,
      this.dateFormat(row.fechaEntrega),
    ]);

  }
  
  dateFormat(d: Date): string{

    let date: Date = new Date(d);
    let fecha: string;

    let dia = date.getDate();
      let mes = date.getMonth() + 1;
      let year = date.getFullYear();

      if (dia < 10 && mes < 10){
        fecha = year+'-0'+mes+'-0'+dia;
      }

      if (dia > 9  && mes < 10){
        fecha = year+'-0'+mes+'-'+dia;
      }

      if (dia < 10  && mes > 9){
        fecha = year+'-'+mes+'-0'+dia;
      }

      if (dia > 9 && mes > 9){
        fecha = year+'-'+mes+'-'+dia;
      }
    
    return fecha;
  }
}

export class Beneficiarios2 {
  cedula?: string;
  nombres?: string;
  productoEntregado?: string;
  descripcionProducto?: string;
  cantidadEntregada?: number;
  fechaEntrega?: Date;  
}

