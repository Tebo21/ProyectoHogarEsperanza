import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Donaciones } from 'src/app/models/Donaciones';
import { Personas } from 'src/app/models/personas';
import { DonaProductoService } from 'src/app/services/dona-producto.service';
import { PersonasService } from 'src/app/services/personas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-producto',
  templateUrl: './registro-producto.component.html',
  styleUrls: ['./registro-producto.component.css']
})
export class RegistroProductoComponent implements OnInit {

  mostrar = false;

  fecha: Date;
  today: string = '2021-10-12';
  
  cedulaDonador: string = '';
  nombreDonador: string = '';
  correoDonador: string = '';
  telefonoDonador: string = '';

  donacionProd: Donaciones = new Donaciones;

   /*formDonador: FormGroup = new FormGroup({
    cedula: new FormControl(''),
     nombre: new FormControl(''),

   });*/
  formProducto: FormGroup = new FormGroup({

    nombre: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    unidades: new FormControl('', Validators.required),
    fecha: new FormControl(new Date())
  });

  constructor(private personaService: PersonasService, private donaProductoService: DonaProductoService
    ,private router:Router) { }

  ngOnInit(): void {
    this.currentDate();
  }

  currentDate(){
    this.fecha = new Date();
    let mes = (this.fecha.getMonth()+1);
    let day = (this.fecha.getDate());

    if (mes < 10 && day < 10){
      this.today =  '0'+day + '-' + '0'+mes + '-' + this.fecha.getFullYear();
    }

    if (mes < 10 && day > 10){
      this.today = day + '-' + '0'+mes + '-' + this.fecha.getFullYear();
    }

    if (mes > 10 && day < 10){
      this.today = '0'+day + '-' + mes + '-' + this.fecha.getFullYear();
    }

    if (mes > 10 && day > 10){
      this.today = day + '-' + mes + '-' + this.fecha.getFullYear();
    }

    console.log('FECHA: '+this.today)

    this.formProducto.setValue({
      fecha: this.fecha
    });
  }

  seleccionOpcion(event: any){
  
    if (event.target.value == "1") {
      this.mostrar = true;
      this.cedulaDonador = '';
      this.nombreDonador = '';
      this.correoDonador = '';
      this.telefonoDonador = '';
    } else {
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
        this.nombreDonador = data.nombres + ' ' + data.apellidos;
        this.correoDonador = data.correo;
        this.telefonoDonador = data.celular;
      }
    )
  }

  registrarProducto(){

    if( this.cedulaDonador != '' && this.formProducto.valid){
      const {nombre, categoria, descripcion, unidades, fecha} = this.formProducto.value;

      this.donacionProd.nombreDonacion = nombre;
      this.donacionProd.categoria = categoria;
      this.donacionProd.descripcionDonacion = descripcion;
      this.donacionProd.cantidad = unidades;
      this.donacionProd.fechaDonacion = fecha;

      this.donacionProd.cedulaPersona = this.cedulaDonador;

      this.donaProductoService.postDonacionProd(this.donacionProd).subscribe(
        data => {
          console.log(data);
          alert("Producto agregado: "+data.nombreDonacion);
          this.limpiarForm();
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
      unidades: '',
      fecha: new Date(),
    })
  }
  
  navegarlista(){
    this.router.navigate(['/Init/control-donacion']);
  }

}
