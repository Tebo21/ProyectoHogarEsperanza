import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CentroMedico } from '../../../models/centro-medico';
import { CentroMedicoService } from '../../../services/centro-medico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  centros: Observable<CentroMedico[]>;

  constructor( private centroMedicoService: CentroMedicoService,
               private router: Router) {}

  ngOnInit(): void {
    console.log('Listado');
    this.reloadData();
  }

  reloadData(){
    this.centros = this.centroMedicoService.getCentroList();
  }

  deleteCentro(id: number){
    // tslint:disable-next-line: deprecation
    this.centroMedicoService.deletCentro(id).subscribe(
    (data) => {
      console.log(data);
      this.reloadData();
    }
    );
  }

  centroDetalle(id: number){
    this.router.navigate(['/detalle-centromedico', id]);
  }

  centroEditar(id: number){
    this.router.navigate(['/update-centromedico', id]);
  }

}
