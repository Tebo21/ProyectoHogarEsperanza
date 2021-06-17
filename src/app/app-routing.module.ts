import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { ActividadPersonaComponent } from './components/actividad-persona/actividad-persona.component';
import { LoginComponent } from './components/login/login.component';
import { CrearActividadComponent } from './components/actividad-persona/crear-actividad/crear-actividad.component';
import { RegistroPersonaComponent } from './components/registro-persona/registro-persona.component';
import { RegistroFamiliaresComponent } from './components/registro-familiares/registro-familiares.component';

import { FichaSocioeconomicaComponent } from './components/ficha-socioeconomica/ficha-socioeconomica.component';
import { RegistroUsuariosComponent } from './components/registro-usuarios/registro-usuarios.component';

import { ListCentroComponent } from './components/centro-medico/list-centro/list-centro.component';
import { VoluntarioCalendarioComponent } from './components/voluntario-calendario/voluntario-calendario.component';
import { DasboardvoluntariosComponent } from './components/dasboardvoluntarios/dasboardvoluntarios.component';
import { EspecialidadComponent } from './components/centro-medico/especialidad/especialidad.component';
import { CrearCitaComponent } from './components/citas_medicas/crear-cita/crear-cita.component';
import { ListadoUsuariosComponent } from './components/listado-usuarios/listado-usuarios.component';
import { RegistroActividadCoordinadorComponent } from './components/registro-actividad-coordinador/registro-actividad-coordinador.component';
import { VistaFichaComponent } from './components/vista-ficha/vista-ficha.component';
import { RegistroDonacionComponent } from './components/donacion-producto/registro-donacion/registro-donacion.component';
import { InicioSuperAdminComponent } from './components/inicio-super-admin/inicio-super-admin.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { EntregarDonacionComponent } from './components/donacion-producto/entregar-donacion/entregar-donacion.component';
import { ReportesActividadesComponent } from './components/actividad-persona/reportes-actividades/reportes-actividades.component';
import { BuscarCitaComponent } from './components/citas_medicas/buscar-cita/buscar-cita.component';

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
    path: 'ficha-socioeconomica',
    component: FichaSocioeconomicaComponent,
  },
  {
    path: 'registro-usuario',
    component: RegistroUsuariosComponent,
  },
  {
    path: 'dashboard',
    component: DasboardvoluntariosComponent,
  },
  {
    path: 'listado-usuarios',
    component: ListadoUsuariosComponent,
  },
  {
    path: 'crear-citaM',
    component: CrearCitaComponent,
  },
  {
    path: 'buscar-citaM',
    component: BuscarCitaComponent,
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
    path: 'registro-producto',
    component: RegistroDonacionComponent
  },
  {
    path: 'dar-donacion',
    component: EntregarDonacionComponent
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
    path: 'perfil-usuario',
    component: PerfilUsuarioComponent,
  },
  {
    path: 'reportes-actividades',
    component: ReportesActividadesComponent
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
