import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Donaciones } from 'src/app/models/Donaciones';
import { Personas } from 'src/app/models/personas';
import { DonaProductoService } from 'src/app/services/dona-producto.service';
import { PersonasService } from 'src/app/services/personas.service';

import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-registro-donacion',
  templateUrl: './registro-donacion.component.html',
  styleUrls: ['./registro-donacion.component.css']
})
export class RegistroDonacionComponent implements OnInit {

  //INFO DONADOR
  cedula: string;
  nombres: string;
  apellidos: string;
  fecha_nac: string;

  donaciones: Array<Donaciones> = [];

  mostrarDonadores: boolean = false;
  listaDonadores: Array<Personas> = [];

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
  buscar: boolean = false;

  registrar: boolean = false;

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
        this.buscar = false;
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
    this.cedulasDonadores = prod.cedulaPersona;
    this.fechaDonaciones = prod.fechaDonacion;

    //OBTENGO LOS DONADORES DE LA DONACION QUE VOY A AGREGAR
    for (let index = 0; index < this.cedulasDonadores.length; index++) {
      this.buscarDonador(this.cedulasDonadores[index]);
    }
    this.mostrarDonadores = true;
    
    this.donacion.categoria = prod.categoria;
    this.donacion.descripcionDonacion = prod.descripcionDonacion;
    this.donacion.idDonacion = prod.idDonacion;
    this.donacion.nombreDonacion = prod.nombreDonacion;

    console.log(this.listaDonadores)
  }

  cancelar(){
    location.reload();
  }

  editar(prod: Donaciones){

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

  registrarProducto(){
    this.mostrarDonadores = false;
    this.registrar = true;
  }
}
