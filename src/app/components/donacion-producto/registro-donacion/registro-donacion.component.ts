import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Donaciones } from 'src/app/models/Donaciones';
import { Personas } from 'src/app/models/personas';
import { DonaProductoService } from 'src/app/services/dona-producto.service';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-registro-donacion',
  templateUrl: './registro-donacion.component.html',
  styleUrls: ['./registro-donacion.component.css']
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

  constructor(private personaService: PersonasService, private donacionService: DonaProductoService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerDonaciones();

    this.tipoDonador = [
      {don : 'Anónimo'},
      {don : 'Cédula'}
    ];

    this.categoriasDonacion = [
      {cat: 'Alimento'},
      {cat: 'Vestimenta'},
      {cat: 'Medicina'},
      {cat: 'Electronico'},
      {cat: 'Otro'}
    ];
  }

  onChangeT(event: any){
    if (event.value != null){
      if (this.tipo.don == 'Anónimo'){
        this.cedula = 'Anónimo';
        this.buscar = false;
        this.nombres = 'Anónimo';
        this.apellidos = 'Anónimo';
        this.fecha_nac = '9999-99-99'
      }else if (this.tipo.don == 'Cédula'){
        this.buscar = true;
      }
    }
  }  

  onChangeC(event: any){
    if(event.value != null){
      console.log(this.categoria.cat)
      if (this.categoria.cat != 'Otro'){
        this.otraCategoria = false;
        this.donacion.categoria = this.categoria.cat;
      }else{
        this.otraCategoria = true;
      }
    }
  }

  buscarPersona(){
    if (this.cedula != null){
      this.personaService.getPorCedula(this.cedula).subscribe(
        data => {
          if (data != null){
            this.cedula = data.cedula;
            this.nombres = data.nombres;
            this.apellidos = data.apellidos;
            this.fecha_nac = data.fechaNacimiento;
          }else{
            alert("No se encontraron resultados")
          }
        }
      );
    }else{
      alert ('Campo de la cedula vacio');
    }
  }

  buscarDonador(cedula: string){
    if (cedula.toUpperCase() != 'ANONIMO' && cedula.toUpperCase() != 'ANÓNIMO'){
      let persona = new Personas;
      this.personaService.getPorCedula(cedula).subscribe(
        data => {
          if (data != null){
            persona.apellidos = data.apellidos;
            persona.cedula = data.cedula;
            persona.celular = data.celular;
            persona.correo = data.correo;
            persona.direccion = data.direccion;
            persona.discapacidad = data.discapacidad;
            persona.edad = data.edad;
            persona.estado_civil = data.estado_civil;
            persona.fechaNacimiento = data.fechaNacimiento;
            persona.genero = data.genero;
            persona.nacionalidad = data.nacionalidad;
            persona.nombres = data.nombres;

            this.listaDonadores.push(persona);
          }else{
            alert("Persona no encontrada");
          }
        }
      );
    }else{
      let persona = new Personas;
      persona.cedula = 'Anónimo';
      persona.nombres = 'Anónimo';
      persona.apellidos = 'Anónimo';

      this.listaDonadores.push(persona);
      console.log('CEDULA ANONIMO')
    }
    
  }

  obtenerDonaciones(){
    this.donacionService.getDonaciones().subscribe(
      data => {
        this.donaciones = data.map(
          result => {
            let donacion = new Donaciones;
            donacion.cantidad = result.cantidad;
            donacion.categoria = result.categoria;
            donacion.cedulaPersona = result.cedulaPersona;
            donacion.descripcionDonacion = result.descripcionDonacion;
            donacion.fechaDonacion = result.fechaDonacion;
            donacion.idDonacion = result.idDonacion;
            donacion.nombreDonacion = result.nombreDonacion;

            return donacion;
          }
        )
        this.loading = false;
      }
    )
  }

  agregar(prod: Donaciones){
    //OBTENGO LOS DONADORES DE LA DONACION QUE VOY A AGREGAR
    for (let index = 0; index < prod.cedulaPersona.length; index++) {
      this.buscarDonador(prod.cedulaPersona[index]);
    }
    this.mostrarDonadores = true;
    this.displayAP = true;
    this.cedula = '';

    this.addProducto.cedulaPersona = prod.cedulaPersona;
    this.addProducto.fechaDonacion = prod.fechaDonacion;
    this.addProducto.categoria = prod.categoria;
    this.categoria = this.addProducto.categoria;
    this.addProducto.descripcionDonacion = prod.descripcionDonacion;
    this.addProducto.idDonacion = prod.idDonacion;
    this.addProducto.nombreDonacion = prod.nombreDonacion;
    this.addProducto.cantidad = prod.cantidad;
  }

  agregarDonacion(){
    //this.displayAP = false;
    if (this.cedula == 'Anónimo' || this.cedula.length >= 10){
      this.addProducto.cedulaPersona.push(this.cedula);
      this.addProducto.fechaDonacion.push(this.today);

      this.addProducto.cantidad = this.addProducto.cantidad + this.addCantidad;

      this.donacionService.updateDonacionProd(this.addProducto.idDonacion, this.addProducto).subscribe(
        data => {
          this.addProducto = new Donaciones;
          console.log(data);
        }
      )
    }else{
      console.log("Error en la cedula");
      alert('Elija el tipo de Donador');
    }
    this.listaDonadores = [];
  }

  cancelarAgregar(){
    this.listaDonadores = [];
    this.displayAP = false;
    this.addCantidad = 0;
  }

  cancelar(){
    location.reload();
  }

  editar(prod: Donaciones){
    //OBTENGO LOS DONADORES DE LA DONACION QUE VOY A AGREGAR
    for (let index = 0; index < prod.cedulaPersona.length; index++) {
      this.buscarDonador(prod.cedulaPersona[index]);
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

  }

  agregarDonador(){
    if (this.cedula == 'Anónimo' || this.cedula.length >= 10){
      this.editProducto.cedulaPersona.push(this.cedula);
      this.editProducto.fechaDonacion.push(this.today);
    }else{
      alert('No se a elejido el tipo de donador');
    }
  }

  quitarDonador(i: number){
    var verificacion = confirm('Seguro de eliminar al donador');
    if (verificacion){
      delete this.editProducto.cedulaPersona[i];
    } 
  }

  editarDonacion(){
    this.donacionService.updateDonacionProd(this.editProducto.idDonacion, this.editProducto).subscribe(
      data => {
        console.log(data);
        this.editProducto = new Donaciones;
        this.donaciones = [];
        this.obtenerDonaciones();
        this.displayEP = false;
        alert('Producto '+data.nombreDonacion+' Actualizado')
        this.displayEP = false;
      }
    )
  }

  registrarNuevoProducto(){
    this.cedulasDonadores = [];
    this.fechaDonaciones = [];

    this.cedulasDonadores.push(this.cedula);
    this.fechaDonaciones.push(this.today);

    this.donacion.cedulaPersona = this.cedulasDonadores;
    this.donacion.fechaDonacion = this.fechaDonaciones;

    console.log(this.donacion);
    this.donacionService.postDonacionProd(this.donacion).subscribe(
      data =>{
        console.log(data);
        this.donacion = new Donaciones;
        alert('Producto '+data.nombreDonacion+' agregado correctamente');
        this.donaciones = [];
        this.obtenerDonaciones();
        this.displayRP = false;
      }
    )
  }

  eliminar(prod: Donaciones){
    this.donacionService.deleteDonacionProd(prod.idDonacion).subscribe(
      data => {
        if (data == true){
          location.reload();
          alert("Producto eliminado")
        }else{
          alert("Error al eliminar")
        }
      }
    )
  }
}
