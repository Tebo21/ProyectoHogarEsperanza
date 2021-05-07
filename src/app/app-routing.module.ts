import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/centro_medico/list/list.component';
import { ActividadPersonaComponent } from './components/actividad-persona/actividad-persona.component';
import { CreateComponent } from './components/centro_medico/create/create.component';
import { DetalleCentroMComponent } from './components/centro_medico/detalle-centro-m/detalle-centro-m.component';
import { UpdateCentroMComponent } from './components/centro_medico/update-centro-m/update-centro-m.component';


const routes: Routes = [
  { path: 'centromedico-listar', component: ListComponent },
  { path: 'nuevo-centromedico', component: CreateComponent},
  { path: 'detalle-centromedico', component: DetalleCentroMComponent},
  { path: 'update-centromedico', component: UpdateCentroMComponent},
  { path: 'actividades', component: ActividadPersonaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
