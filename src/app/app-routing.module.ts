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
import { RegistroUsuariosComponent } from './components/registro-usuarios/registro-usuarios.component';

import { ControlDonacionesComponent } from './components/donacion-producto/control-donaciones/control-donaciones.component';
import { ListCentroComponent } from './components/centro-medico/list-centro/list-centro.component';
import { VoluntarioCalendarioComponent } from './components/voluntario-calendario/voluntario-calendario.component';
import { DasboardvoluntariosComponent } from './components/dasboardvoluntarios/dasboardvoluntarios.component';
import { EspecialidadComponent } from './components/centro-medico/especialidad/especialidad.component';
import { CrearCitaComponent } from './components/citas_medicas/crear-cita/crear-cita.component';
import { ListadoUsuariosComponent } from './components/listado-usuarios/listado-usuarios.component';
import { RegistroActividadCoordinadorComponent } from './components/registro-actividad-coordinador/registro-actividad-coordinador.component';
import { VistaFichaComponent } from './components/vista-ficha/vista-ficha.component';
import { EntregaDonacionComponent } from './components/donacion-producto/entrega-donacion/entrega-donacion.component';
import { RegistroDonacionComponent } from './components/donacion-producto/registro-donacion/registro-donacion.component';
import { ResumenDonacionComponent } from './components/donacion-producto/resumen-donacion/resumen-donacion.component';
import { InicioSuperAdminComponent } from './components/inicio-super-admin/inicio-super-admin.component';
import { EntregarDonacionComponent } from './components/donacion-producto/entregar-donacion/entregar-donacion.component';

      // AQUI VAN SUS RUTAS DENTRO DE LOS CHILDRENS
      // NO SE OLVIDEN SI NO ENCUENTRA SU PROYECTO ALGUN MODULO LE DAN NPM INSTALL Y SE SOLUCIONA
 // ESTE PATH DE AQUI TIENEN EL CSS PARA PODER APLICAR A TODO EL PROYECTO

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
        path: 'centromedico-listar',
        component: ListCentroComponent,
      },
      {
        path: 'especialidad',
        component: EspecialidadComponent,
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
        path: 'registro-usuario',
        component: RegistroUsuariosComponent,
      },
      {
        path: 'dashboard',
        component : DasboardvoluntariosComponent,
      },
      {
        path: 'listado-usuarios',
        component : ListadoUsuariosComponent,
      },
      {
        path: 'crear-citaM',
        component: CrearCitaComponent,
      },
      {
        path: 'vista-ficha',
        component: VistaFichaComponent
      },
      {
        path: 'registro-coordinador',
        component: RegistroActividadCoordinadorComponent
      },
      {
        path: 'entrega-donacion',
        component: EntregaDonacionComponent
      },
      {
        path: 'registro-donacion',
        component: RegistroDonacionComponent
      },
      {
        path: 'dar-donacion',
        component: EntregarDonacionComponent
      },
      {
        path: 'resumen-donacion',
        component: ResumenDonacionComponent
      },
      {
        path: 'inicio-super-admin',
        component: InicioSuperAdminComponent
      },

      {
        path: 'calendario',
        component: VoluntarioCalendarioComponent,
      },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
