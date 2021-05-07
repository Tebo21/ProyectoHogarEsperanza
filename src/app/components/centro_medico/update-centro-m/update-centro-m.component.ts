import { Component, OnInit } from '@angular/core';
import { CentroMedico } from '../../../models/centro-medico';
import { ActivatedRoute, Router } from '@angular/router';
import { CentroMedicoService } from '../../../services/centro-medico.service';

@Component({
  selector: 'app-update-centro-m',
  templateUrl: './update-centro-m.component.html',
  styleUrls: ['./update-centro-m.component.css']
})
export class UpdateCentroMComponent implements OnInit {

  id: number;
  centro: CentroMedico;

  constructor(private route: ActivatedRoute, private router: Router,
              private centroService: CentroMedicoService) { }

  ngOnInit(): void {
    this.centro = new CentroMedico();
    // tslint:disable-next-line: no-string-literal
    this.id = this.route.snapshot.params['id'];
    this.centroService.getCentro(this.id)
    .subscribe(data => {
      console.log(data);
      this.centro = data;
    }, error => console.log(error));
  }

  // tslint:disable-next-line: typedef
  updateCentro() {
    this.centroService.updateCentro(this.id, this.centro)
      .subscribe(data => console.log(data), error => console.log(error));
    this.centro = new CentroMedico();
    this.gotoList();
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    this.updateCentro();
  }

  // tslint:disable-next-line: typedef
  gotoList() {
    this.router.navigate(['/centromedico-listar']);
  }

}
