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

  //today: string;

  fechaActual: Date = new Date();;
  
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
    unidades: new FormControl('', Validators.required)
  });;

  //Imagen
  selectedFile: File;
  imgURL: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;


  constructor(private personaService: PersonasService, private donaProductoService: DonaProductoService, private router:Router) { }

  ngOnInit(): void {
  }

  onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  /*currentDate(): string{
    
    let fecha = new Date();
    let mes = (fecha.getMonth()+1);
    let day = (fecha.getDate());

    if (mes < 10 && day < 10){
      this.today =  '0'+day + '-' + '0'+mes + '-' + fecha.getFullYear();
    }

    if (mes < 10 && day > 10){
      this.today = day + '-' + '0'+mes + '-' + fecha.getFullYear();
    }

    if (mes > 10 && day < 10){
      this.today = '0'+day + '-' + mes + '-' + fecha.getFullYear();
    }

    if (mes > 10 && day > 10){
      this.today = day + '-' + mes + '-' + fecha.getFullYear();
    }

    return this.today; 
  }*/

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
        this.nombreDonador = data.nombres + ' ' + data.apellidos;
        this.correoDonador = data.correo;
        this.telefonoDonador = data.celular;
      }
    )
  }

  registrarProducto(){

    if( this.cedulaDonador != '' && this.formProducto.valid){

      /*console.log(this.selectedFile);
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);*/

      const {nombre, categoria, descripcion, unidades} = this.formProducto.value;

      this.donacionProd.nombreDonacion = nombre;
      this.donacionProd.categoria = categoria;
      this.donacionProd.descripcionDonacion = descripcion;
      this.donacionProd.cantidad = unidades;
      this.donacionProd.fechaDonacion = this.fechaActual;

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
      unidades: ''
    })
  }
  
  navegarlista(){
    this.router.navigate(['/Init/control-donacion']);
  }

}
