import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ActividadPersonaComponent } from './components/actividad-persona/actividad-persona.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';
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
import { CrearCitamComponent } from './components/citas_medicas/crear-citam/crear-citam.component';
import { ListarCitamComponent } from './components/citas_medicas/listar-citam/listar-citam.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DasboardvoluntariosComponent } from './components/dasboardvoluntarios/dasboardvoluntarios.component';
import { VoluntarioCalendarioComponent } from './components/voluntario-calendario/voluntario-calendario.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ListCentroComponent } from './components/centro-medico/list-centro/list-centro.component';
import { CommonModule } from '@angular/common';
import { EspecialidadComponent } from './components/centro-medico/especialidad/especialidad.component';

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
    CrearCitamComponent,
    ListarCitamComponent,
    DasboardvoluntariosComponent,
    VoluntarioCalendarioComponent,
    ListCentroComponent,
    EspecialidadComponent,
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
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
