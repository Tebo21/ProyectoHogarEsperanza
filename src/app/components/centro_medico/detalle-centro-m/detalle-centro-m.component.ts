import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CentroMedico } from '../../../models/centro-medico';
import { CentroMedicoService } from '../../../services/centro-medico.service';

@Component({
  selector: 'app-detalle-centro-m',
  templateUrl: './detalle-centro-m.component.html',
  styleUrls: ['./detalle-centro-m.component.css']
})
export class DetalleCentroMComponent implements OnInit {

  id: number;
  centro: CentroMedico;

  constructor(private route: ActivatedRoute, private router: Router,
              private centroService: CentroMedicoService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
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
  gotoList() {
    this.router.navigate(['/centromedico-listar']);
  }

}
