import { Component, OnInit } from '@angular/core';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import { Personas } from 'src/app/models/personas';
import { PdfMakeWrapper, Txt, Img, Table } from 'pdfmake-wrapper';
import { EntregarDonacionService } from 'src/app/services/entregar-donacion.service';
import { PersonasService } from 'src/app/services/personas.service';
import { EntregaDonacion } from 'src/app/models/EntregaDonacion';

import Swal from 'sweetalert2';

type TableRow3 = [string, string, string, string, number, Date];
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
   selected: Beneficiarios2[];
   selectedUsers: Beneficiarios2[];

   listaEntrega: EntregaDonacion[];


   listaEntregaDonaciones: Array<EntregaDonacion>; 
   
  loading: boolean = true;


  constructor(
    private entregarDonacionService: EntregarDonacionService,
    private personaService: PersonasService,
    
  ) { }

  ngOnInit(): void {
    this.selectedUsers = [];
    this.ListadoPersonas = [];
    this.listarBeneficiarioConNombres();
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
        this.personaService.getPorCedula(this.listaEntrega[i].cedulaBeneficiario).subscribe(data2 =>{
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
          this.selectedUsers.push(usuarioImprimir);
        })
      }


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
    pdf.add(this.creaTabla(this.selectedUsers));
    pdf.create().open();
  }

  creaTabla(data: Beneficiarios2[]): ITable {
    [{}];
    return new Table([
      ['Cédula', 'Nombres', 'Producto', 'descripción', 'cantidad', 'fecha'],
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
      row.fechaEntrega,
    ]);

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

