import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CentroMedico } from '../../../models/centro-medico';
import { CentroMedicoService } from '../../../services/centro-medico.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  centro: CentroMedico = new CentroMedico();
  submitted = false;

  constructor( private centroMedicoService: CentroMedicoService,
               private router: Router) { }

  ngOnInit(): void {
  }

  newCentro(): void{
    this.submitted = false;
    this.centro = new CentroMedico();
  }

  saveCentro(){
    this.centroMedicoService.createCentro(this.centro)
    // tslint:disable-next-line: deprecation
    .subscribe(data => console.log(data), error => console.log(error));
    this.centro = new CentroMedico();
    this.gotoList();
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    this.submitted = true;
    this.saveCentro();
  }

  // tslint:disable-next-line: typedef
  gotoList() {
    this.router.navigate(['/centromedico-listar']);
  }

}
