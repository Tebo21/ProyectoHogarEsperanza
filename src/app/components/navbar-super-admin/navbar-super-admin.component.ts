import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-super-admin',
  templateUrl: './navbar-super-admin.component.html',
  styleUrls: ['./navbar-super-admin.component.css']
})
export class NavbarSuperAdminComponent implements OnInit {

  tipoUser:any;
  mostrarSuperAdmin:boolean;
  mostrarAdmin:boolean;
  mostrarVoluntarioInterno:boolean;
  mostrarVoluntarioExterno:boolean;

  constructor() { }

  ngOnInit(): void {    
  }

}
