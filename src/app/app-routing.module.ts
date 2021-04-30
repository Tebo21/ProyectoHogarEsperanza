import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './components/centro_medico/create/create.component';
import { EditComponent } from './components/centro_medico/edit/edit.component';
import { ListComponent } from './components/centro_medico/list/list.component';


const routes: Routes = [
  { path:'centromedico-crear', component: CreateComponent },
  { path:'centromedico-listar', component: ListComponent },
  { path:'centromedico-editar', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
