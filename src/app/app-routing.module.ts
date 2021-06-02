import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { ActividadPersonaComponent } from './components/actividad-persona/actividad-persona.component';
import { LoginComponent } from './components/login/login.component';
import { CrearActividadComponent } from './components/actividad-persona/crear-actividad/crear-actividad.component';
import { RegistroPersonaComponent } from './components/registro-persona/registro-persona.component';
import { RegistroFamiliaresComponent } from './components/registro-familiares/registro-familiares.component';
import { RegistroProductoComponent } from './components/donacion-producto/registro-producto/registro-producto.component';

import { FichaSocioeconomicaComponent } from './components/ficha-socioeconomica/ficha-socioeconomica.component';
import { ControlDonacionesComponent } from './components/donacion-producto/control-donaciones/control-donaciones.component';
import { ListCentroComponent } from './components/centro-medico/list-centro/list-centro.component';
import { VoluntarioCalendarioComponent } from './components/voluntario-calendario/voluntario-calendario.component';
import { DasboardvoluntariosComponent } from './components/dasboardvoluntarios/dasboardvoluntarios.component';
import { CrearCitaComponent } from './components/citas_medicas/crear-cita/crear-cita.component';
import { ListarCitaComponent } from './components/citas_medicas/listar-cita/listar-cita.component';


      // AQUI VAN SUS RUTAS DENTRO DE LOS CHILDRENS
      // NO SE OLVIDEN SI NO ENCUENTRA SU PROYECTO ALGUN MODULO LE DAN NPM INSTALL Y SE SOLUCIONA
 // ESTE PATH DE AQUI TIENEN EL CSS PARA PODER APLICAR A TODO EL PROYECTO

const routes: Routes = [
  {
    path: 'Init',
    component: LayoutComponent,
    children: [
      {
        path: 'centromedico-listar',
        component: ListCentroComponent,
      },
      {
        path: 'actividades',
        component: ActividadPersonaComponent,
      },
      {
        path: 'crear-actividad',
        component: CrearActividadComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'registro-persona',
        component: RegistroPersonaComponent,
      },
      {
        path: 'registro-familiares',
        component: RegistroFamiliaresComponent,
      },
      {
        path: 'registro-producto',
        component: RegistroProductoComponent,
      },
      {
        path: 'control-donacion',
        component: ControlDonacionesComponent,
      },
      {
        path: 'ficha-socioeconomica',
        component: FichaSocioeconomicaComponent,
      },
      {
        path: 'dashboard',
        component : DasboardvoluntariosComponent,
      },
      {
        path: 'calendario',
        component: VoluntarioCalendarioComponent,
      },
      {
        path: 'crear-citaM',
        component: CrearCitaComponent,
      },
      {
        path: 'listar-citaM',
        component: ListarCitaComponent
      }

    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'Init/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
