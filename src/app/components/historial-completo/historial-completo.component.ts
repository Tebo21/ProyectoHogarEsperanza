import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsistenciaPersona } from 'src/app/models/asistenciapersona';
import { CitasMedicas } from 'src/app/models/citas-medicas';
import { DocumentosBeneficiarios } from 'src/app/models/documentos-beneficiarios';
import { EntregaDonacion } from 'src/app/models/EntregaDonacion';
import { FichaSocioeconomica } from 'src/app/models/ficha-socioeconomica';
import { ObservacionesPersonas } from 'src/app/models/observaciones-personas';
import { Personas } from 'src/app/models/personas';
import { RegistroFamiliares } from 'src/app/models/registro-familiares';
import { AsistenciapersonaService } from 'src/app/services/asistenciapersona.service';
import { CitaMedicaService } from 'src/app/services/cita-medica.service';
import { DocumentosService } from 'src/app/services/documentos.service';
import { EntregarDonacionService } from 'src/app/services/entregar-donacion.service';
import { FichaSocioeconomicaService } from 'src/app/services/ficha-socioeconomica.service';
import { ObservacionesPersonasService } from 'src/app/services/observaciones-personas.service';
import { PersonasService } from 'src/app/services/personas.service';
import { RegistroFamiliaresService } from 'src/app/services/registro-familiares.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historial-completo',
  templateUrl: './historial-completo.component.html',
  styleUrls: ['./historial-completo.component.css']
})
export class HistorialCompletoComponent implements OnInit {

  persona : Personas = {};
  ficha : FichaSocioeconomica = {};
  familiares : RegistroFamiliares[];
  asistencias : AsistenciaPersona[];
  observaciones: ObservacionesPersonas[];
  listaDocumentos: DocumentosBeneficiarios[];
  donaciones: EntregaDonacion[];
  citas: CitasMedicas[];
  esposo: string = '';
  cedula: string = localStorage.getItem('cedulaEditar');
  numHijos: number
  //Logeo
  tipoUser: any

  constructor(private personService: PersonasService, private famiservice: RegistroFamiliaresService, 
    private fichaservice: FichaSocioeconomicaService, private asistenciaService: AsistenciapersonaService,
    private Obserserivce: ObservacionesPersonasService, private documentoserver: DocumentosService,
    private entregarDonacionService: EntregarDonacionService, private citasservice: CitaMedicaService,
    private router: Router) { }

  ngOnInit(): void {
    this.cedula = localStorage.getItem('cedulaEditar');
    this.familiares = []
    this.asistencias = []
    this.observaciones = []
    this.citas = []
    this.ComprobarLogin()
  }

  ComprobarLogin() {
    this.tipoUser = localStorage.getItem('rolUser');
    if (this.tipoUser == 1 || this.tipoUser == 2 || this.tipoUser == 3 || this.tipoUser == 4) {
      this.cargarDatos()
    } else {
      Swal.fire({
        title: 'Por favor inicie sesión primero',
        icon: 'error',
      });
      this.router.navigateByUrl('login')
    }
  }

  cargarDatos() {
    this.personService.getUserByCedula(this.cedula).subscribe(data=>{
      this.persona = data
    })
    this.fichaservice.getfichacedula(this.cedula).subscribe(data=>{
      this.ficha = data
    })
    this.famiservice.getFamByCedula(this.cedula).subscribe(data=>{
      this.familiares = data
      for (let index = 0; index < this.familiares.length; index++) {
        const element = this.familiares[index];
        if(element.parentesco == 'Esposo' || element.parentesco == 'Esposa'){
          this.esposo = element.nombreF+' '+element.apellidoF
        }
        this.numHijos = this.familiares[0].numHijos
      }
    })
    this.asistenciaService.getAsistenciaByCedula(this.cedula).subscribe(data=>{
      this.asistencias = data;
    })
    this.Obserserivce.getBycedula(this.cedula).subscribe(data => {
      this.observaciones = data;
    })
    this.documentoserver.getBycedula(this.cedula).subscribe(data => {
      this.listaDocumentos = data;
    })
    this.entregarDonacionService.getPorCedula(this.cedula).subscribe(data => {
      this.donaciones = data
    });
    this.citasservice.getPorCedulaPa(this.cedula).subscribe(data => {
      this.citas = data
    });
  }

  convertirBooleanos(bool : boolean) : string{
    if(bool == true){
      return 'Si'
    } else if (bool == false){
      return 'No'
    }
  }

  cancelar() {
    this.router.navigate(['/lista-beneficiarios']);
  }

}
