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
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistroUsuariosComponent } from './components/registro-usuarios/registro-usuarios.component';
import { UsuarioService } from './services/usuarios.service';
import { PanelModule } from 'primeng/panel';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {KeyFilterModule} from 'primeng/keyfilter';
import {InputSwitchModule} from 'primeng/inputswitch';
import { DasboardvoluntariosComponent } from './components/dasboardvoluntarios/dasboardvoluntarios.component';
import { VoluntarioCalendarioComponent } from './components/voluntario-calendario/voluntario-calendario.component';
import { ListCentroComponent } from './components/centro-medico/list-centro/list-centro.component';
import { CommonModule, DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { EspecialidadComponent } from './components/centro-medico/especialidad/especialidad.component';
import { RegistroActividadCoordinadorComponent } from './components/registro-actividad-coordinador/registro-actividad-coordinador.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FichaSocioeconomicaService } from './services/ficha-socioeconomica.service';
import { ListadoUsuariosComponent } from './components/listado-usuarios/listado-usuarios.component';
import {TableModule} from 'primeng/table';
import { NavbarAdminComponent } from './components/navbar-admin/navbar-admin.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CrearCitaComponent } from './components/citas_medicas/crear-cita/crear-cita.component';
import { VistaFichaComponent } from './components/vista-ficha/vista-ficha.component';
import { RegistroDonacionComponent } from './components/donacion-producto/registro-donacion/registro-donacion.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MessageService} from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InicioSuperAdminComponent } from './components/inicio-super-admin/inicio-super-admin.component';
import {MenubarModule} from 'primeng/menubar';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { EntregarDonacionComponent } from './components/donacion-producto/entregar-donacion/entregar-donacion.component';
import { ReportesActividadesComponent } from './components/actividad-persona/reportes-actividades/reportes-actividades.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { PaginatorModule } from 'primeng/paginator';
import {TooltipModule} from 'primeng/tooltip';
import { FilterPipe } from './components/actividad-persona/reportes-actividades/pipe/filter.pipe';
import { BuscarCitaComponent } from './components/citas_medicas/buscar-cita/buscar-cita.component';
import {DividerModule} from 'primeng/divider';
import {PasswordModule} from 'primeng/password';
import { ListaBeneficiariosComponent } from './components/lista-beneficiarios/lista-beneficiarios.component';
import { PipePipe } from './components/voluntario-calendario/pipe.pipe';
import { EditarUsuariosComponent } from './components/listado-usuarios/editar-usuarios/editar-usuarios.component';
import { ListarProductoDonadoComponent } from './components/donacion-producto/listar-producto-donado/listar-producto-donado.component';
import { ObservacionesPersonasComponent } from './components/observaciones-personas/observaciones-personas.component';
import { EditarBeneficiariosComponent } from './components/lista-beneficiarios/editar-beneficiarios/editar-beneficiarios.component';
import { EditarDocumentosComponent } from './components/lista-beneficiarios/editar-documentos/editar-documentos.component';
import { HistorialBComponent } from './components/historial-b/historial-b.component';
import {KnobModule} from 'primeng/knob';
import {ChipsModule} from 'primeng/chips';
import { FichaComponent } from './components/ficha/ficha.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ChartModule} from 'primeng/chart';
import {FileUploadModule} from 'primeng/fileupload';
import { HistorialCompletoComponent } from './components/historial-completo/historial-completo.component';
PdfMakeWrapper.setFonts(pdfFonts);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ActividadPersonaComponent,
    CrearActividadComponent,
    RegistroPersonaComponent,
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
    NavbarAdminComponent,
    VistaFichaComponent,
    RegistroDonacionComponent,
    InicioSuperAdminComponent,
    EntregarDonacionComponent,
    ReportesActividadesComponent,
    PerfilUsuarioComponent,
    FilterPipe,
    BuscarCitaComponent,
    ListaBeneficiariosComponent,
    PipePipe,
    EditarUsuariosComponent,
    ListarProductoDonadoComponent,
    ObservacionesPersonasComponent,
    EditarBeneficiariosComponent,
    EditarDocumentosComponent,
    HistorialBComponent,
    FichaComponent,
    HistorialCompletoComponent
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
    FlatpickrModule.forRoot(),
    PaginatorModule,
    TooltipModule,
    DividerModule,
    PasswordModule,
    KnobModule,
    ChipsModule,
    InputTextareaModule,
    ChartModule,
    FileUploadModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  providers: [UsuarioService,FichaSocioeconomicaService,MessageService,DatePipe, {provide:LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}
