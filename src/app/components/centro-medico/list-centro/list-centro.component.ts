import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CentroMedicoService } from '../../../services/centro-medico.service';
import { CentroMedico } from '../../../models/centro-medico';

@Component({
  selector: 'app-list-centro',
  templateUrl: './list-centro.component.html',
  styleUrls: ['./list-centro.component.css']
})
export class ListCentroComponent implements OnInit {

  centro: CentroMedico[] = [];
  selectedCentro: CentroMedico = new CentroMedico();

  constructor(private router: RouterModule, private service: CentroMedicoService) { }

  ngOnInit(): void {
    this.listCentro();
  }

  listCentro(){
    this.service.listCentro().subscribe(data => {
        this.centro = data;
        console.log(data);
        console.log("CENTRO");
        console.log(this.centro);
    })
  }

  deleteCentro(centro: CentroMedico) {
    let response = confirm(`¿Desea eliminar: ${centro.nombreCentroMedico}?`);
    console.log("RESPONSE:")
    console.log(response);
    if (response == true) {
      this.service.deletCentro(centro.idCentroMedico).subscribe(data => {
          alert(`${centro.nombreCentroMedico} fue eliminado`);
          this.listCentro(); 
      });
    }
  }

  openForEdit(centro: CentroMedico){
    this.selectedCentro = centro;
  }
  
  addOrEdit(){
    if(this.selectedCentro.idCentroMedico){
      this.service.updateCentro(this.selectedCentro.idCentroMedico, this.selectedCentro).subscribe(
        data => {
          if(data){
            alert("Centro medico editado");
            this.listCentro();
            this.selectedCentro = new CentroMedico();
          }
        }
      );
    }else {
      console.log("REGISTRAR");
      this.service.createCentro(this.selectedCentro).subscribe(
        (data) => {
          console.log("GUARDAR1");
          if (data){
          this.listCentro();
          alert("Centro medico agregado");
          console.log("GUARDAR 2");
          this.selectedCentro = new CentroMedico();
          this.listCentro();
          }
      });
    }
  }

}
