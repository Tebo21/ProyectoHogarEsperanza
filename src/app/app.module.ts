import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ActividadPersonaComponent } from './components/actividad-persona/actividad-persona.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CrearActividadComponent } from './components/actividad-persona/crear-actividad/crear-actividad.component';
import { RegistroPersonaComponent } from './components/registro-persona/registro-persona.component';
import { RegistroFamiliaresComponent } from './components/registro-familiares/registro-familiares.component';
import { RegistroProductoComponent } from './components/donacion-producto/registro-producto/registro-producto.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FichaSocioeconomicaComponent } from './components/ficha-socioeconomica/ficha-socioeconomica.component';
import { ControlDonacionesComponent } from './components/donacion-producto/control-donaciones/control-donaciones.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RegistroUsuariosComponent } from './components/registro-usuarios/registro-usuarios.component';
import { UsuarioService } from './services/usuarios.service';
import { PanelModule } from 'primeng/panel';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {KeyFilterModule} from 'primeng/keyfilter';
import {InputSwitchModule} from 'primeng/inputswitch';

import { DasboardvoluntariosComponent } from './components/dasboardvoluntarios/dasboardvoluntarios.component';
import { VoluntarioCalendarioComponent } from './components/voluntario-calendario/voluntario-calendario.component';
import { ListCentroComponent } from './components/centro-medico/list-centro/list-centro.component';
import { CommonModule, DatePipe } from '@angular/common';
import { EspecialidadComponent } from './components/centro-medico/especialidad/especialidad.component';
import { RegistroActividadCoordinadorComponent } from './components/registro-actividad-coordinador/registro-actividad-coordinador.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FichaSocioeconomicaService } from './services/ficha-socioeconomica.service';
import { ListadoUsuariosComponent } from './components/listado-usuarios/listado-usuarios.component';
import {TableModule} from 'primeng/table';
import { NavbarSuperAdminComponent } from './components/navbar-super-admin/navbar-super-admin.component';
import { NavbarAdminComponent } from './components/navbar-admin/navbar-admin.component';
import { NavbarVoluntarioComponent } from './components/navbar-voluntario/navbar-voluntario.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CrearCitaComponent } from './components/citas_medicas/crear-cita/crear-cita.component';
import { VistaFichaComponent } from './components/vista-ficha/vista-ficha.component';
import { EntregaDonacionComponent } from './components/donacion-producto/entrega-donacion/entrega-donacion.component';
import { RegistroDonacionComponent } from './components/donacion-producto/registro-donacion/registro-donacion.component';
import { ResumenDonacionComponent } from './components/donacion-producto/resumen-donacion/resumen-donacion.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MessageService} from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InicioSuperAdminComponent } from './components/inicio-super-admin/inicio-super-admin.component';
import {MenubarModule} from 'primeng/menubar';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    ActividadPersonaComponent,
    CrearActividadComponent,
    RegistroPersonaComponent,
    RegistroFamiliaresComponent,
    RegistroProductoComponent,
    FichaSocioeconomicaComponent,
    ControlDonacionesComponent,
    DasboardvoluntariosComponent,
    VoluntarioCalendarioComponent,
    ListCentroComponent,
    EspecialidadComponent,
    CrearCitaComponent,
    RegistroUsuariosComponent,
    DasboardvoluntariosComponent,
    VoluntarioCalendarioComponent,
    ListCentroComponent,
    RegistroActividadCoordinadorComponent,
    ListadoUsuariosComponent,
    NavbarSuperAdminComponent,
    NavbarAdminComponent,
    NavbarVoluntarioComponent,
    VistaFichaComponent,
    EntregaDonacionComponent,
    RegistroDonacionComponent,
    ResumenDonacionComponent,
    InicioSuperAdminComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    DialogModule,
    DropdownModule,
    AccordionModule,
    BrowserAnimationsModule,
    ButtonModule,
    PanelModule,
    TableModule,
    VirtualScrollerModule,
    ConfirmDialogModule,
    KeyFilterModule,
    InputSwitchModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    ToastModule,
    MenubarModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  providers: [UsuarioService,FichaSocioeconomicaService,MessageService,DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
