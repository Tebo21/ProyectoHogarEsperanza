import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/centro_medico/list/list.component';
import { ActividadPersonaComponent } from './components/actividad-persona/actividad-persona.component';


const routes: Routes = [
  { path:'centromedico-listar', component: ListComponent },
  { path:'actividades', component: ActividadPersonaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
