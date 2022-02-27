import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {

  nombreUsuario: any;

  constructor() { }

  items: MenuItem[];

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('usuarioA')    
    if(this.nombreUsuario == null){
      this.nombreUsuario = 'Usuario'
    } else {
      this.nombreUsuario = localStorage.getItem('usuarioA')    
    }
    
    this.items = [
      {
        label: 'Actividades',
        icon: 'pi pi-calendar',
        items: [{

            label: 'Mis Actividades',
            icon: 'pi pi-fw pi-calendar-plus',
            routerLink: ['/dashboard']
        },{

          label: 'Reporte de actividades',
          icon: 'pi pi-fw pi-calendar',
          routerLink: ['/reportes-actividades']
      }]
      },
      {
        label: 'Centro Médico',
        icon: 'pi pi-fw pi-heart',
        routerLink: ['/centromedico-listar']
      },
      {
        label: 'Citas Médicas',
        icon: 'pi pi-briefcase',
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
              },
              {
                label: 'Listar Beneficiarios',
                icon: 'pi pi-fw pi-users',
                routerLink: ['/lista-beneficiarios']
              },
              {
                label: 'Documentos Beneficiarios',
                icon: 'pi pi-fw pi-id-card',
                routerLink: ['/lista-documentos']
              },
              {
                label: 'Historial Beneficiarios',
                icon: 'pi pi-fw pi-folder-open',
                routerLink: ['/historial']
              }
            ]
          },
          {
            label: 'Observaciones',
            icon: 'pi pi-fw pi-eye',
            items: [
              {
                label: 'Listar Observaciones',
                icon: 'pi pi-fw pi-eye',
                routerLink: ['/lista-observaciones-personas']
              }
            ]
          }
        ]
      },


    ];
  }
}
