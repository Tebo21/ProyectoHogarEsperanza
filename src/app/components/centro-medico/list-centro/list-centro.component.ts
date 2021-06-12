import { Component, OnInit } from '@angular/core';
import { CentroMedicoService } from '../../../services/centro-medico.service';
import { CentroMedico } from '../../../models/centro-medico';

@Component({
  selector: 'app-list-centro',
  templateUrl: './list-centro.component.html',
  styleUrls: ['./list-centro.component.css'],
})
export class ListCentroComponent implements OnInit {
  centro: CentroMedico[] = [];
  selectedCentro: CentroMedico = new CentroMedico();

  response_condicion: boolean = false;
  response_msg: String;

  constructor(
    private service: CentroMedicoService
  ){
    
  }

  ngOnInit(): void {
    this.listCentro();
  }

  listCentro() {
    this.service.listCentro().subscribe((data) => {
      this.centro = data;
      console.log(data);
      console.log('CENTRO');
      console.log(this.centro);
    });
  }

  deleteCentro(centro: CentroMedico) {
    let response = confirm(`¿Desea eliminar: ${centro.nombreCentroMedico}?`);
    console.log('RESPONSE:');
    console.log(response);
    if (response == true) {
      this.service.deletCentro(centro.idCentroMedico).subscribe((data) => {
        alert(`${centro.nombreCentroMedico} fue eliminado`);
        this.listCentro();
      });
    }
  }

  openForEdit(centro: CentroMedico) {
    this.selectedCentro = centro;
  }

  addOrEdit() {
    if (this.selectedCentro.idCentroMedico) {
      if (this.validar_datos(this.selectedCentro) == true) {
        this.service
          .updateCentro(this.selectedCentro.idCentroMedico, this.selectedCentro)
          .subscribe((data) => {
            if (data) {
              alert('Centro medico editado');
              this.listCentro();
              this.selectedCentro = new CentroMedico();
            }
          });
      }
    } else {
      if (this.validar_datos(this.selectedCentro) == true) {
        this.service.createCentro(this.selectedCentro).subscribe((data) => {
          if (data) {
            this.listCentro();
            alert('Centro medico agregado');
            this.selectedCentro = new CentroMedico();
            this.listCentro();
          }
        });
      }
    }
  }

  /*VALIDACION DE CAMPOS */

  validar_datos(centro: CentroMedico): boolean {
    if (this.validar_nombre(centro.nombreCentroMedico) == false) {
      return false;
    }

    if (this.validar_direccion(centro.direccionCentroMedico) == false) {
      return false;
    }

    if (this.validar_telefono(centro.telefonoCentroMedico) == false) {
      return false;
    }

    return true;
  }

  validar_nombre(nombre: String) {
    if (Boolean(nombre) && nombre.length > 0) {
      return true;
    } else {
      this.show_response('Campo nombre vacío');
      return false;
    }
  }

  validar_direccion(direccion: String) {
    if (Boolean(direccion) && direccion.length > 0) {
      return true;
    } else {
      this.show_response('Campo dirección vacío');
      return false;
    }
  }

  validar_telefono(telefono: String) {
    if (Boolean(telefono) && telefono.length > 0) {
      return true;
    } else {
      this.show_response('Campo teléfono vacío');
      return false;
    }
  }

  show_response(msg: String) {
    this.response_condicion = true;
    this.response_msg = msg;
  }
}
