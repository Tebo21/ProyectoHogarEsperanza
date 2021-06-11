import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {

  constructor() { }

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Actividades',
        icon: 'pi pi-calendar-times',
        routerLink: ['/dashboard']
      },
      {
        label: 'Centro Médico',
        icon: 'pi pi-fw pi-heart',
        routerLink: ['/centromedico-listar']
      },
      {
        label: 'Citas Médicas',
        icon: 'pi pi-fw pi-folder-open',
        routerLink: ['/crear-citaM']
      },
      {
        label: 'Donaciones',
        icon: 'pi pi-fw pi-inbox',
        routerLink: ['/registro-producto']
      },
      {
        label: 'Personas',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Usuarios',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Registrar Usuario',
                icon: 'pi pi-fw pi-user-plus',
                routerLink: ['/registro-usuario']
              },
              {
                label: 'Listar Usuarios',
                icon: 'pi pi-fw pi-users',
                routerLink: ['/listado-usuarios']
              },

            ]
          },
          {
            label: 'Beneficiarios',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Registrar Beneficiario',
                icon: 'pi pi-fw pi-user-plus',
                routerLink: ['/registro-persona']
              }
            ]
          }
        ]
      },


    ];
  }
}
