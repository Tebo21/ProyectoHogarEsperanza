import { Component, OnInit } from '@angular/core';
import { Especialidad } from '../../../models/especialidad';
import { RouterModule } from '@angular/router';
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
  nombreSeCe: number;

  constructor(private router: RouterModule, private service: EspecialidadService, private serviceCentro: CentroMedicoService) { }

  ngOnInit(): void {
    this.listEspecialidad();
    this.listCentro();
  }

  listCentro(){
    this.serviceCentro.listCentro().subscribe(data => {
        this.centro = data;
        console.log(data);
        console.log("CENTRO");
        console.log(this.centro);
    })
  }

  listEspecialidad(){
    this.service.listEspecialidad().subscribe(data => {
        this.especialidad = data;
        console.log(data);
        console.log("ESPECIALIDAD");
        console.log(this.especialidad);
    })
  }

  openForEdit(espe: Especialidad){
    this.selectedEspecialidad = espe;
  }

  addOrEdit(){
    if(this.selectedEspecialidad.idEspecialidad){
      this.selectedEspecialidad.centroMedico = this.nombreSeCe.toString();
      this.service.updateEspecialidad(this.selectedEspecialidad.idEspecialidad, this.selectedEspecialidad).subscribe(
        data => {
          if(data){
            alert("Especialidad editada");
            this.listEspecialidad();
            this.selectedEspecialidad = new Especialidad();
          }
        }
      );
    }else {
      this.selectedEspecialidad.centroMedico = this.nombreSeCe.toString();
      console.log(this.selectedEspecialidad.centroMedico);
      console.log(this.centro);
      this.service.createEspecialidad(this.selectedEspecialidad).subscribe(
        (data) => {
          if (data){
          alert("Especialidad agregada");
          this.selectedEspecialidad = new Especialidad();
          this.listEspecialidad();
          }
      });
    }
  }


  deleteEspecialidad(esp: Especialidad) {
    let response = confirm(`¿Desea eliminar: ${esp.nombreEspecialidad}?`);
    console.log("RESPONSE:")
    console.log(response);
    if (response == true) {
      console.log("Eliminar 1");
      this.service.deleteEspecialidad(esp.idEspecialidad).subscribe(data => {
        console.log("Eliminar 2");
          alert(`${esp.nombreEspecialidad} fue eliminado`);
          console.log("Eliminar 3");
          this.listEspecialidad();
          console.log("Eliminar 4"); 
      });
    }
  }

}
