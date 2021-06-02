import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/centro_medico/list/list.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ActividadPersonaComponent } from './components/actividad-persona/actividad-persona.component';
import { CreateComponent } from './components/centro_medico/create/create.component';
import { DetalleCentroMComponent } from './components/centro_medico/detalle-centro-m/detalle-centro-m.component';
import { UpdateCentroMComponent } from './components/centro_medico/update-centro-m/update-centro-m.component';
import { LoginComponent } from './components/login/login.component';
import { CrearActividadComponent } from './components/actividad-persona/crear-actividad/crear-actividad.component';
import { RegistroPersonaComponent } from './components/registro-persona/registro-persona.component';
import { RegistroFamiliaresComponent } from './components/registro-familiares/registro-familiares.component';
import { RegistroProductoComponent } from './components/donacion-producto/registro-producto/registro-producto.component';

import { FichaSocioeconomicaComponent } from './components/ficha-socioeconomica/ficha-socioeconomica.component';
import { ListarCitamComponent } from './components/citas_medicas/listar-citam/listar-citam.component';
import { CrearCitamComponent } from './components/citas_medicas/crear-citam/crear-citam.component';
import { RegistroUsuariosComponent } from './components/registro-usuarios/registro-usuarios.component';


//AQUI VAN SUS RUTAS DENTRO DE LOS CHILDRENS
//NO SE OLVIDEN SI NO ENCUENTRA SU PROYECTO ALGUN MODULO LE DAN NPM INSTALL Y SE SOLUCIONA
//ESTE PATH DE AQUI TIENEN EL CSS PARA PODER APLICAR A TODO EL PROYECTO

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'Init',
    component: LayoutComponent,
    children: [
      {
        path: 'centromedico-listar',
        component: ListComponent,
      },
      {
        path: 'nuevo-centromedico',
        component: CreateComponent,
      },
      {
        path: 'detalle-centromedico',
        component: DetalleCentroMComponent,
      },
      {
        path: 'update-centromedico',
        component: UpdateCentroMComponent,
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
        path: 'ficha-socioeconomica',
        component: FichaSocioeconomicaComponent,
      },
      {
        path: 'registro-usuario',
        component: RegistroUsuariosComponent,
      },
    ],
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
