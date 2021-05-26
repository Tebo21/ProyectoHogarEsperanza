import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/centro_medico/list/list.component';
import { ActividadPersonaComponent } from './components/actividad-persona/actividad-persona.component';
import { CreateComponent } from './components/centro_medico/create/create.component';
import { DetalleCentroMComponent } from './components/centro_medico/detalle-centro-m/detalle-centro-m.component';
import { UpdateCentroMComponent } from './components/centro_medico/update-centro-m/update-centro-m.component';
import { LoginComponent } from './components/login/login.component';
import { CrearActividadComponent } from './components/actividad-persona/crear-actividad/crear-actividad.component'
import { RegistroPersonaComponent } from './components/registro-persona/registro-persona.component';
import { RegistroFamiliaresComponent } from './components/registro-familiares/registro-familiares.component';


const routes: Routes = [
  { path: 'centromedico-listar', component: ListComponent },
  { path: 'nuevo-centromedico', component: CreateComponent},
  { path: 'detalle-centromedico', component: DetalleCentroMComponent},
  { path: 'update-centromedico', component: UpdateCentroMComponent},
  { path: 'actividades', component: ActividadPersonaComponent },
  { path: 'crear-actividad', component: CrearActividadComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro-persona', component: RegistroPersonaComponent},
  { path: 'registro-familiares', component: RegistroFamiliaresComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
