import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Donaciones } from 'src/app/models/Donaciones';
import { Personas } from 'src/app/models/personas';
import { DonaProductoService } from 'src/app/services/dona-producto.service';
import { PersonasService } from 'src/app/services/personas.service';
import { Router } from '@angular/router';
import {DividerModule} from 'primeng/divider';

@Component({
  selector: 'app-registro-producto',
  templateUrl: './registro-producto.component.html',
  styleUrls: ['./registro-producto.component.css']
})
export class RegistroProductoComponent implements OnInit {

  mostrar = false;
  otraCategoria = false;

  //today: string;

  fechaActual: Date = new Date();;
  
  cedulaDonador: string = '';
  nombreDonador: string = '';
  correoDonador: string = '';
  telefonoDonador: string = '';

  donacionProd: Donaciones = new Donaciones;

  formProducto: FormGroup = new FormGroup({

    nombre: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    categoria2: new FormControl(''),
    descripcion: new FormControl('', Validators.required),
    unidades: new FormControl('', Validators.required)
  });;

  constructor(private personaService: PersonasService, private donaProductoService: DonaProductoService, private router:Router) { }

  ngOnInit(): void {
  }

  optionCategory(event: any){
    if (event.target.value == "OTRO"){
      this.otraCategoria = true;
    }else{
      this.otraCategoria = false;
    }
  }

  seleccionOpcion(event: any){
  
    if (event.target.value == "1") {
      this.mostrar = true;
      this.cedulaDonador = '';
      this.nombreDonador = '';
      this.correoDonador = '';
      this.telefonoDonador = '';
    } else if (event.target.value == "2"){
      this.mostrar = false;
      this.cedulaDonador = 'ANONIMO';
      this.nombreDonador = 'ANONIMO';
      this.correoDonador = 'ANONIMO';
      this.telefonoDonador = 'ANONIMO';
    }
  }

  buscarPersona(){
    this.personaService.getPorCedula(this.cedulaDonador).subscribe(
      data => {
        if (data != null){
          this.nombreDonador = data.nombres + ' ' + data.apellidos;
          this.correoDonador = data.correo;
          this.telefonoDonador = data.celular;
        }else{
          alert('No hay resultados');    
          this.cedulaDonador = '';
          this.nombreDonador = '';
          this.correoDonador = '';
          this.telefonoDonador = '';
        }
      }
    )
  }


  registrarProducto(){

    if( this.cedulaDonador != '' && this.formProducto.valid){

      const {nombre, categoria, categoria2, descripcion, unidades} = this.formProducto.value;

      if (this.otraCategoria){
        this.donacionProd.categoria = categoria2;
        this.donacionProd.categoria = this.donacionProd.categoria.toUpperCase();
      }else if (!this.otraCategoria){
        this.donacionProd.categoria = categoria;
      }

      this.donacionProd.nombreDonacion = nombre;
      this.donacionProd.descripcionDonacion = descripcion;
      this.donacionProd.cantidad = unidades;
      this.donacionProd.fechaDonacion = this.fechaActual;

      this.donacionProd.cedulaPersona = this.cedulaDonador;

      this.donaProductoService.postDonacionProd(this.donacionProd).subscribe(
        data => {
          if (data != null){
            this.limpiarForm();
            alert("Producto agregado: "+data.nombreDonacion);
          }
        }
      )
    }else{
      alert('Datos incorrectos!');
    }
  }

  limpiarForm(){
    this.formProducto.setValue({
      nombre: '',
      categoria: '',
      descripcion: '',
      unidades: ''
    })
  }

  cancelar(){
    location.reload();
  }

  redigirCrear(){
    this.router.navigate(['registro-usuario']);
  }
  
  navegarlista(){
    this.router.navigate(['control-donacion']);
  }

}
