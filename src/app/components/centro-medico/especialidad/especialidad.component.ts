import { Component, OnInit } from '@angular/core';
import { Especialidad } from '../../../models/especialidad';
import { EspecialidadService } from '../../../services/especialidad.service';
import { CentroMedicoService } from '../../../services/centro-medico.service';
import { CentroMedico } from '../../../models/centro-medico';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {

  especialidad: Especialidad[] = [];
  centro: CentroMedico[] = [];
  selectedEspecialidad: Especialidad = new Especialidad();
  nombreSeCe: string;

  response_condicion: boolean = false;
  response_msg: String;

  constructor(
    private service: EspecialidadService,
    private serviceCentro: CentroMedicoService
  ) {}

  ngOnInit(): void {
    this.listEspecialidad();
    this.listCentro();
  }

  listCentro() {
    this.serviceCentro.listCentro().subscribe((data) => {
      this.centro = data;
    });
  }

  listEspecialidad() {
    this.service.listEspecialidad().subscribe((data) => {
      this.especialidad = data;
    });
  }

  openForEdit(espe: Especialidad) {
    this.selectedEspecialidad = espe;
    this.nombreSeCe = espe.centroMedico;
  }

  addOrEdit() {
    if (this.selectedEspecialidad.idEspecialidad) {
      if (this.validar_datos(this.selectedEspecialidad) == true) {
        this.selectedEspecialidad.centroMedico = this.nombreSeCe;
        this.service
          .updateEspecialidad(
            this.selectedEspecialidad.idEspecialidad,
            this.selectedEspecialidad
          )
          .subscribe((data) => {
            if (data) {
              alert('Especialidad editada');
              this.listEspecialidad();
              this.selectedEspecialidad = new Especialidad();
            }
          });
      }
    } else {
      this.selectedEspecialidad.centroMedico = this.nombreSeCe;
      if (this.validar_datos(this.selectedEspecialidad) == true) {
        this.service
          .createEspecialidad(this.selectedEspecialidad)
          .subscribe((data) => {
            if (data) {
              alert('Especialidad agregada');
              this.selectedEspecialidad = new Especialidad();
              this.show_response('');
              this.listEspecialidad();
            }
          });
      }
    }
  }

  deleteEspecialidad(esp: Especialidad) {
    let response = confirm(`¿Desea eliminar: ${esp.nombreEspecialidad}?`);
    if (response == true) {
      this.service.deleteEspecialidad(esp.idEspecialidad).subscribe((data) => {
        alert(`${esp.nombreEspecialidad} fue eliminado`);
        this.listEspecialidad();
      });
    }
  }

  /*VALIDACION DE CAMPOS */

  validar_datos(esp: Especialidad): boolean {
    if (this.validar_nombre(esp.nombreEspecialidad) == false) {
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

  show_response(msg: String) {
    this.response_condicion = true;
    this.response_msg = msg;
  }
}
