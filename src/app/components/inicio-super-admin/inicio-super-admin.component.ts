import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio-super-admin',
  templateUrl: './inicio-super-admin.component.html',
  styleUrls: ['./inicio-super-admin.component.css']
})
export class InicioSuperAdminComponent implements OnInit {

  nombreUsuario:any;

  constructor() { }

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('usuarioA')
  }

}
