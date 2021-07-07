import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { Donaciones } from 'src/app/models/Donaciones';
import { Personas } from 'src/app/models/personas';
import { DonaProductoService } from 'src/app/services/dona-producto.service';
import { PersonasService } from 'src/app/services/personas.service';
import { PdfMakeWrapper, Txt, Img, Table } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import { type } from 'node:os';
import Swal from 'sweetalert2';
import { date } from 'faker';


type TableRow2  = [string, string, number, string, string[], string[]]

@Component({
  selector: 'app-registro-donacion',
  templateUrl: './registro-donacion.component.html',
  styleUrls: ['./registro-donacion.component.css'],
})
export class RegistroDonacionComponent implements OnInit {
  editProducto: Donaciones = new Donaciones;
  displayEP: boolean = false;

  addCantidad: number = 0;
  addProducto: Donaciones = new Donaciones;
  displayAP: boolean = false;

  mostrarDonadores: boolean = false;
  listaDonadores: Array<Personas> = [];

  displayRP: boolean = false;
  buscar: boolean = false;

  //INFO DONADOR
  cedula: string;
  nombres: string;
  apellidos: string;
  fecha_nac: string;

  donaciones: Array<Donaciones> = [];
  donacionesFiltradas: Array<Donaciones> = [];

  loading: boolean = true;

  cedulasDonadores: string[] = [];
  fechaDonaciones: Date[] = [];

  today: Date = new Date;
  donacion: Donaciones = new Donaciones;

  tipoDonador: any[];
  categoriasDonacion: any[];

  otraCategoria: boolean = false;
  tipo: any;
  categoria: any;

  constructor(
    private personaService: PersonasService,
    private donacionService: DonaProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerDonaciones();

    this.tipoDonador = [
      { don: 'Anónimo' }, 
      { don: 'Cédula' }
    ];

    this.categoriasDonacion = [
      { cat: 'Alimento' },
      { cat: 'Vestimenta' },
      { cat: 'Medicina' },
      { cat: 'Electronico' },
      { cat: 'Otro' },
    ];
  }

  onFilter(event, dt) {
    this.donacionesFiltradas = [];
    this.donacionesFiltradas = event.filteredValue;
  }

  obtenerDonaciones() {
    this.donaciones = [];
    this.donacionService.getDonaciones().subscribe((data) => {
      this.donaciones = data.map((result) => {
        let donacion = new Donaciones();
        donacion.cantidad = result.cantidad;
        donacion.categoria = result.categoria;
        donacion.cedulaPersona = result.cedulaPersona;
        donacion.descripcionDonacion = result.descripcionDonacion;
        donacion.fechaDonacion = result.fechaDonacion;
        donacion.idDonacion = result.idDonacion;
        donacion.nombreDonacion = result.nombreDonacion;

        return donacion;
      });
      this.loading = false;
    });
  }

  onChangeT(event: any) {
    if (event.value != null) {
      if (this.tipo.don == 'Anónimo') {
        this.cedula = 'Anónimo';
        this.buscar = false;
        this.nombres = 'Anónimo';
        this.apellidos = 'Anónimo';
        this.fecha_nac = '1111-11-11';
      } else if (this.tipo.don == 'Cédula') {
        this.buscar = true;
      }
    }
  }

  onChangeC(event: any) {
    if (event.value != null) {
      console.log(this.categoria.cat);
      if (this.categoria.cat != 'Otro') {
        this.otraCategoria = false;
        this.donacion.categoria = this.categoria.cat;
      } else {
        this.otraCategoria = true;
      }
      if(this.displayEP){
        this.editProducto.categoria = this.categoria.cat;
      }
    }
  }

  buscarPersona() {
    if (this.cedula != null) {
      this.personaService.getPorCedula(this.cedula).subscribe((data) => {
        if (data != null) {
          this.cedula = data.cedula;
          this.nombres = data.nombres;
          this.apellidos = data.apellidos;
          this.fecha_nac = data.fechaNacimiento;
        } else {
          this.reiniciar();
          Swal.fire({
            title: 'Cédula no encontrada!',
            icon: 'warning'
          });
        }
      });
    } else {
      this.reiniciar();
      Swal.fire({
        title: 'Campo de la cedula vacio!',
        icon: 'warning'
      });
    }
  }

  buscarDonador(cedula: string) {
    if (cedula.toUpperCase() != 'ANONIMO' && cedula.toUpperCase() != 'ANÓNIMO') {
      
      this.personaService.getPorCedula(cedula).subscribe((data) => {

        let personadon = new Personas;
        personadon.cedula = data.cedula;
        personadon.nombres = data.nombres;
        personadon.apellidos = data.apellidos;        

        this.listaDonadores.push(personadon);
      })
    }
    
    if (cedula.toUpperCase() === 'ANONIMO' || cedula.toUpperCase() === 'ANÓNIMO') {

      let personainc = new Personas;
      personainc.cedula = 'Anónimo';
      personainc.nombres = 'Anónimo';
      personainc.apellidos = 'Anónimo';

      this.listaDonadores.push(personainc);
    }
  }

  registrarNuevoProducto() {
    this.cedulasDonadores = [];
    this.fechaDonaciones = [];

    this.cedulasDonadores.push(this.cedula);
    this.fechaDonaciones.push(this.today);

    this.donacion.cedulaPersona = this.cedulasDonadores;
    this.donacion.fechaDonacion = this.fechaDonaciones;

    console.log(this.donacion);
    if (this.donacion.nombreDonacion != null && this.donacion.descripcionDonacion != null && this.donacion.categoria != null && this.donacion.cantidad > 0){
      this.donacionService.postDonacionProd(this.donacion).subscribe((data) => {
        console.log(data);
        this.reiniciar();

        Swal.fire({
          title: 'Registrado!',
          text: 'Producto ' + data.nombreDonacion + ' registrado correctamente',
          icon: 'success'
        });
      });
    }else{
      this.displayRP = false;
      Swal.fire({
        title: 'Contiene campos vacios o incorrectos!',
        icon: 'warning'
      }).then(
        result => {
          this.displayRP = true;
        }
      );
    }
    
  }

  agregar(prod: Donaciones) {
    //OBTENGO LOS DONADORES DE LA DONACION QUE VOY A AGREGAR
    this.listaDonadores = [];
    for (let index = 0; index < prod.cedulaPersona.length; index++) {
      this.buscarDonador(prod.cedulaPersona[index]);
      console.log(prod.cedulaPersona[index]);
    }
    this.mostrarDonadores = true;
    this.displayAP = true;

    this.addProducto.cedulaPersona = prod.cedulaPersona;
    this.addProducto.fechaDonacion = prod.fechaDonacion;
    this.addProducto.categoria = prod.categoria;
    this.categoria = this.addProducto.categoria;
    this.addProducto.descripcionDonacion = prod.descripcionDonacion;
    this.addProducto.idDonacion = prod.idDonacion;
    this.addProducto.nombreDonacion = prod.nombreDonacion;
    this.addProducto.cantidad = prod.cantidad;
  }

  agregarDonacion() {
    //this.displayAP = false;
    if (this.cedula == 'Anónimo' || this.cedula.length >= 10) {
      this.addProducto.cedulaPersona.push(this.cedula);
      this.addProducto.fechaDonacion.push(this.today);

      this.addProducto.cantidad = this.addProducto.cantidad + this.addCantidad;

      this.donacionService.updateDonacionProd(this.addProducto.idDonacion, this.addProducto).subscribe(
        (data) => {
          console.log(data);
          this.reiniciar();
          
          Swal.fire({
            title: 'Agregado!',
            text: 'Producto ' + data.nombreDonacion + ' agregado correctamente!',
            icon: 'success'
          });
        });
    } else {
      //ARREGLAR
      this.displayAP = false;
      Swal.fire({
        title: 'Elija el donador o ingrese una cantidad superior a 0!',
        icon: 'warning'
      });
    }
  }

  editar(prod: Donaciones) {
    //OBTENGO LOS DONADORES DE LA DONACION QUE VOY A AGREGAR
    this.listaDonadores = [];
    if (prod.cedulaPersona.length > 0) {
      for (let index = 0; index < prod.cedulaPersona.length; index++) {
        this.buscarDonador(prod.cedulaPersona[index]);
      }
    } else {
      Swal.fire({
        title: 'No contiene donador/es vinculados a este producto!',
        icon: 'warning'
      });
    }

    this.mostrarDonadores = true;
    this.displayEP = true;
    this.cedula = '';

    this.editProducto.cantidad = prod.cantidad;
    this.editProducto.categoria = prod.categoria;
    this.editProducto.cedulaPersona = prod.cedulaPersona;
    this.editProducto.descripcionDonacion = prod.descripcionDonacion;
    this.editProducto.fechaDonacion = prod.fechaDonacion;
    this.editProducto.idDonacion = prod.idDonacion;
    this.editProducto.nombreDonacion = prod.nombreDonacion;

    console.log(this.listaDonadores);
    console.log(this.editProducto.cedulaPersona);
  }

  editarDonacion() {
    this.donacionService
      .updateDonacionProd(this.editProducto.idDonacion, this.editProducto)
      .subscribe((data) => {
        console.log(data);
        this.reiniciar();

        Swal.fire({
          title: 'Actualizado!',
          text: 'Producto ' + data.nombreDonacion + ' actualizado correctamente!',
          icon: 'success'
        });

      });
  }

  
  agregarDonador() {
    if (this.cedula == 'Anónimo' || this.cedula.length >= 10) {
    
      this.editProducto.cedulaPersona.push(this.cedula);
      this.editProducto.fechaDonacion.push(this.today);
    
      this.listaDonadores = [];
      for (
        let index = 0;
        index < this.editProducto.cedulaPersona.length;
        index++
      ) {
        if (this.editProducto.cedulaPersona[index] != null) {
          this.buscarDonador(this.editProducto.cedulaPersona[index]);
        }
      }
    } else {
      this.reiniciar();
      Swal.fire({
        title: 'No se a elejido el tipo de donador!',
        text: 'Vuelva a intentarlo',
        icon: 'warning'
      });
    }
  }

  quitarDonador(i: number) {
    this.displayEP = false;
    Swal.fire({
      title: '¿Seguro de eliminar?',
      text: "Se eliminara al donador seleccionado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('eliminar indice ' + i);
        delete this.editProducto.cedulaPersona[i];
        delete this.editProducto.fechaDonacion[i];
        this.cedulasDonadores = [];
        this.fechaDonaciones = [];
        this.listaDonadores = [];
        for ( let index = 0; index < this.editProducto.cedulaPersona.length; index++) {
          if (this.editProducto.cedulaPersona[index] != null) {
            this.cedulasDonadores.push(this.editProducto.cedulaPersona[index]);
            this.fechaDonaciones.push(this.editProducto.fechaDonacion[index]);
            this.buscarDonador(this.editProducto.cedulaPersona[index]);
          }
        }  
      }

      this.editProducto.cedulaPersona = this.cedulasDonadores;
      this.editProducto.fechaDonacion = this.fechaDonaciones;
      this.displayEP = true;
    })
  }


  eliminar(prod: Donaciones) {
    Swal.fire({
      title: '¿Seguro de eliminar?',
      text: 'Seguro de eliminar el producto ' + prod.nombreDonacion,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.donacionService.deleteDonacionProd(prod.idDonacion).subscribe(
          (data) => {
            if (data == true) {
              this.reiniciar();
              Swal.fire({
                title: 'Producto eliminado!',
                icon: 'success'
              });
            } else {
              location.reload();
            }
        });
      }
    })
  }

  registrarDonador() {
    this.router.navigate(['registro-usuario']);
  }

  entregarDonacion() {
    this.router.navigate(['dar-donacion']);
  }

  reiniciar(){
    this.today = new Date;

    this.tipo = '';
    this.categoria = ''; 
    this.addCantidad = 0;
    
    this.addProducto = new Donaciones;
    this.editProducto = new Donaciones;
    this.donacion = new Donaciones;
    
    this.buscar = false;
    this.otraCategoria = false;
    
    this.displayAP = false;
    this.displayEP = false;
    this.displayRP = false;

    this.cedula = '';
    this.nombres = '';
    this.apellidos = '';
    this.fecha_nac = '';

    this.cedulasDonadores = [];
    this.fechaDonaciones = [];
    this.listaDonadores = [];
    
    this.obtenerDonaciones();
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
        this.generarPdf();
        Swal.fire(
          'Descargado!',
          'El registro ha sido descargado',
          'success'
        )
      }
    })
  }


  async generarPdf(){
    const pdf = new PdfMakeWrapper();
    pdf.info({
      title: 'Reporte de productos filtrados',
    });
    pdf.add(await new Img('../../assets/img/logo.png').build());
    pdf.add(new Txt('   ').end);
    pdf.add(
      new Txt('Lista de productos').alignment('center').bold().fontSize(16).end
    );
    pdf.add(new Txt('   ').end);

    if (this.donacionesFiltradas.length > 0){
      pdf.add(this.creaTabla2(this.donacionesFiltradas));
    }else{
      pdf.add(this.creaTabla2(this.donaciones));
    }

    pdf.create().open();
    this.reiniciar(); 
  }

  creaTabla2(data: Donaciones[]): ITable{
    [{}];
    return new Table([
      ['Nombre Producto', 'Descripción', 'Cantidad', 'Categoria', 'Fecha Donación', 'Cédula Donador'],
      ...this.extraerDatos2(data),
    ])
     
      .heights((rowIndex) => {
        return rowIndex === 0 ? 20 : 0;
      })
      .layout({
        /**% 2 */
        fillColor: (rowIndex: number, node: any, columnIndex: number) => {
          return rowIndex === 0 ? '#CCCCCC' : '';
        },
      }).end;
  }

  extraerDatos2(data: Donaciones[]): TableRow2[] {
    return data.map((row) => [
      row.nombreDonacion,
      row.descripcionDonacion,
      row.cantidad,
      row.categoria,
      this.formatearFechas(row.fechaDonacion),
      row.cedulaPersona,
    ]);
  }

  formatearFechas(fechas: Date[]): string[]{
    
    let dates: string[] = [];

    fechas.forEach(element => {

      let date: Date = new Date(element);

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

      dates.push(fecha);
    }); 

    return dates;
  }
}
