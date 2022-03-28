import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActividadPersonaComponent } from './components/actividad-persona/actividad-persona.component';
import { LoginComponent } from './components/login/login.component';
import { CrearActividadComponent } from './components/actividad-persona/crear-actividad/crear-actividad.component';
import { RegistroPersonaComponent } from './components/registro-persona/registro-persona.component';
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
import { ListaBeneficiariosComponent } from './components/lista-beneficiarios/lista-beneficiarios.component';
import { EditarUsuariosComponent } from './components/listado-usuarios/editar-usuarios/editar-usuarios.component';
import { ListarProductoDonadoComponent } from './components/donacion-producto/listar-producto-donado/listar-producto-donado.component';
import { ObservacionesPersonasComponent } from './components/observaciones-personas/observaciones-personas.component';
import { EditarBeneficiariosComponent } from './components/lista-beneficiarios/editar-beneficiarios/editar-beneficiarios.component';
import { EditarDocumentosComponent } from './components/lista-beneficiarios/editar-documentos/editar-documentos.component';
import { HistorialBComponent } from './components/historial-b/historial-b.component';
import { FichaComponent } from './components/ficha/ficha.component';
import { HistorialCompletoComponent } from './components/historial-completo/historial-completo.component';

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
    path: 'editar-documentos',
    component: EditarDocumentosComponent,
  },
  {
    path: 'actividades',
    component: ActividadPersonaComponent,
  },
  {
    path: 'observaciones-personas',
    component: ObservacionesPersonasComponent
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
    path: 'editar-beneficiarios',
    component: EditarBeneficiariosComponent,
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
    path: 'lista-beneficiarios',
    component: ListaBeneficiariosComponent,
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
    path: 'editar-usuario',
    component: EditarUsuariosComponent
  },
  {
    path: 'lista',
    component: ListarProductoDonadoComponent
  },
  {
    path: 'historial',
    component: HistorialBComponent
  },
  {
    path: 'informe',
    component: FichaComponent
  },
  {
    path: 'historial-completo',
    component: HistorialCompletoComponent
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
