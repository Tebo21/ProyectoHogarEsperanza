import { Component, OnInit } from '@angular/core';
import { CentroMedico } from 'src/app/models/centro-medico';
import { CitasMedicas } from '../../../models/citas-medicas';
import { CitaMedicaService } from '../../../services/cita-medica.service';
import { CentroMedicoService } from '../../../services/centro-medico.service';
import { EspecialidadService } from '../../../services/especialidad.service';
import { Especialidad } from '../../../models/especialidad';
import { Observable, timer } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { PersonasService } from '../../../services/personas.service';
import { Personas } from '../../../models/personas';
import { Router } from '@angular/router';
import { ActividadesService } from 'src/app/services/actividades.service';
import pdfMake from 'pdfmake/build/pdfmake';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { mailSender } from 'src/app/models/mailSender';
import { MailsenderService } from 'src/app/services/mailsender.service';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css']
})
export class CrearCitaComponent implements OnInit {

  cita: CitasMedicas = new CitasMedicas();
  citaMedica!: Observable<CitasMedicas[]>;
  citaM: CitasMedicas[] = [];
  centro: CentroMedico[] = [];
  especialidad: Especialidad[] = [];
  nombreSeCe: string;
  nombreSeEspecialidad: string;
  asistencia: boolean;

  // persona
  cedulapa = new FormControl('', [Validators.required]);
  cedulaac = new FormControl('', [Validators.required]);
  cedulatra = new FormControl('', [Validators.required]);

  today = new Date();
  fCitaMedica: Date;

  fechaRegistro = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-ECU', '+0593');
  fechaCita: string;
  cedulaPaciente: string;
  cedulaAcom: string;
  cedulaTra: string;
  personaB!: Personas;
  nombreper: string;
  correoper: string;
  telefonoper: string;
  nombreper2: string;
  correoper2: string;
  telefonoper2: string;
  nombreper3: string;
  correoper3: string;
  telefonoper3: string;

  //valida
  valida = false;
  valida2 = false;
  valida3 = false;

  // validaciones
  response_condicion: boolean = false;
  response_msg: string;
  //Asistencia
  faltas: any;
  personaValidar: Personas = {};

  constructor(private citaMedicaService: CitaMedicaService,
    private serviCentro: CentroMedicoService,
    private serviceEspecialidad: EspecialidadService,
    private personaService: PersonasService,
    public _actividadservice: ActividadesService,
    public mailsenderService: MailsenderService,
    private router: Router) { }

  // tslint:disable-next-line: typedef
  ngOnInit(): void {
    this.reloadData();
    this.listCentro();
    this.listEspecialidad();
    this.listCita();
    this.asistencia = false;
  }


  // tslint:disable-next-line: typedef
  reloadData(): void {
    this.citaMedica = this.citaMedicaService.listCitas();
  }

  listCita() {
    this.citaMedicaService.listCitas().subscribe((data) => {
      this.citaM = data;
    });
  }

  listCentro() {
    this.serviCentro.listCentro().subscribe(data => {
      this.centro = data;
    });
  }

  listEspecialidad() {
    this.serviceEspecialidad.listEspecialidad().subscribe(data => {
      this.especialidad = data;
    });
  }

  openForEdit(citan: CitasMedicas) {
    this.cita = citan;
    this.cedulaPaciente = citan.paciente;
    this.cedulaAcom = citan.acompaniante;
    this.cedulaTra = citan.trabajadorFundacion;
    this.nombreSeCe = citan.centroMedico;
    this.nombreSeEspecialidad = citan.especialidad;
    this.fechaRegistro = citan.fechaRegistro;
    this.fechaCita = citan.fechaCitaMedica;
    this.asistencia = citan.asistencia;
    //this.today.
  }

  // tslint:disable-next-line: typedef
  save() {
    if (this.cita.idCitasMedicas) {
      this.cita.centroMedico = this.nombreSeCe;
      this.cita.especialidad = this.nombreSeEspecialidad;
      this.cita.paciente = this.cedulaPaciente;
      this.cita.acompaniante = this.cedulaAcom;
      this.cita.trabajadorFundacion = this.cedulaTra;
      this.cita.fechaRegistro = this.fechaRegistro;
      this.cita.asistencia = this.asistencia;
      // tslint:disable-next-line: triple-equals
      if (this.validar_datos(this.cita) == true) {
        this.citaMedicaService.updateCita(this.cita.idCitasMedicas, this.cita).subscribe(
          data => {
            if (data) {
              this.enviarMail()
              Swal.fire({
                icon: 'success',
                title: 'Cita Medica editada',
              });
              const contador = timer(2000);
              contador.subscribe((n) => {
                window.location.reload();
              })
            }
          }
        );
      }
    } else {
      this.cita.centroMedico = this.nombreSeCe;
      this.cita.especialidad = this.nombreSeEspecialidad;
      this.cita.paciente = this.cedulaPaciente;
      this.cita.acompaniante = this.cedulaAcom;
      this.cita.trabajadorFundacion = this.cedulaTra;
      this.cita.trabajadorFundacion = this.cedulaTra;
      this.cita.fechaRegistro = this.fechaRegistro;
      this.cita.asistencia = this.asistencia;
      // tslint:disable-next-line: triple-equals
      if (this.validar_datos(this.cita) == true) {
        this.citaMedicaService.createCitas(this.cita)
          .subscribe((data) => {
            if (data) {
              alert('Cita Medica Registrada Correcamente');
              this.enviarMail()
              Swal.fire({
                icon: 'success',
                title: 'Cita Medica Registrada Correcamente',
              });
              const contador = timer(2000);
              contador.subscribe((n) => {
                window.location.reload();
              })
            }
          });
      }
    }

  }

  enviarMail() {
    let nuevoMail: mailSender = {
      toEmail: this.cita.mensaje.toString(),
      body: 'Tiene una cita de: ' + this.cita.descripcionCitaMedica + ' con fecha: ' + this.cita.fechaCitaMedica +
        ' su acompañante es ' + this.nombreper2 + ' en el Centro Médico ' + this.nombreSeCe + ' en la especialidad: '
        + this.nombreSeEspecialidad + ' Observaciones a tener en cuenta: ' + this.cita.nota,
      subjetct: 'Fundación Hogar Esperanza Cuenca le recuerda.'
    }
    this.mailsenderService.enviarMail(nuevoMail.toEmail, nuevoMail.body, nuevoMail.subjetct).subscribe(data => {
      console.log(data)
      console.error();
    }
    )
  }

  deleteCita(cita: CitasMedicas) {
    const response = confirm(`¿Desea eliminar: ${cita.descripcionCitaMedica}?`);
    // tslint:disable-next-line: triple-equals
    if (response == true) {
      this.citaMedicaService.deletCita(cita.idCitasMedicas).subscribe(data => {
        alert(`${cita.descripcionCitaMedica} fue eliminado`);
        this.reloadData();
      });
    }
  }

  // alertsInfor
  buscarPersona() {
    this.personaService.getUserByCedula(this.cedulaPaciente).subscribe(
      data => {
        if (data != null) {
          this.valida = true;
          this.nombreper = data.nombres + ' ' + data.apellidos;
          this.correoper = data.correo;
          this.telefonoper = data.celular;

        } else {
          alert('No hay resultados');
        }
      }
    );
  }

  buscarAcompa() {
    this.personaService.getUserByCedula(this.cedulaAcom).subscribe(
      data => {
        if (data != null) {
          this.valida2 = true;
          this.nombreper2 = data.nombres + ' ' + data.apellidos;
          this.correoper2 = data.correo;
          this.telefonoper2 = data.celular;
        } else {
          alert('No hay resultados');
        }
      }
    );
  }

  buscarTraba() {
    this.personaService.getUserByCedula(this.cedulaTra).subscribe(
      data => {
        if (data != null) {
          this.valida3 = true;
          this.nombreper3 = data.nombres + ' ' + data.apellidos;
          this.correoper3 = data.correo;
          this.telefonoper3 = data.celular;

        } else {
          alert('No hay resultados');
        }
      }
    );
  }


  limpiarCampo() {
    this.cedulaPaciente = '';
    this.cedulaAcom = '';
    this.cedulaTra = '';
    this.nombreSeCe = '';
    this.nombreSeEspecialidad = '';
  }

  // btn para alerts
  registrar() {
    this.router.navigate(['/registro-usuario']);
  }

  // btn para busqueda
  buscar() {
    this.router.navigate(['/buscar-citaM']);
  }

  // validaciones
  validar_datos(cita: CitasMedicas): boolean {
    if (this.validar_cedula_acompanante(cita.acompaniante) == false) {
      return false;
    }
    if (this.validar_descripcion(cita.descripcionCitaMedica) == false) {
      return false;
    }
    if (this.validar_cedula_paciente(cita.paciente) == false) {
      return false;
    }
    if (this.validar_cedula_trabajador(cita.trabajadorFundacion) == false) {
      return false;
    }

    if (this.validar_observacion(cita.nota) == false) {
      return false;
    }

    return true;
  }

  validar_descripcion(descripcion: string) {
    if (Boolean(descripcion) && descripcion.length > 0) {
      return true;
    } else {
      this.show_response('Campo descripción vacío');
      return false;
    }
  }

  validar_cedula_paciente(paciente: string) {
    if (Boolean(paciente) && paciente.length > 0) {
      return true;
    } else {
      this.show_response('Campo cédula del paciente vacío');
      return false;
    }
  }

  validar_cedula_acompanante(acompanante: string) {
    if (
      Boolean(acompanante) &&
      acompanante.length > 0
    ) {
      return true;
    } else {
      this.show_response('Campo cédula del acompañante vacío');
      return false;
    }
  }

  validar_cedula_trabajador(trabajador: string) {
    if (
      Boolean(trabajador) &&
      trabajador.length > 0
    ) {
      return true;
    } else {
      this.show_response('Campo cédula del trabajador vacío');
      return false;
    }
  }

  validar_correo(correo: String) {
    if (Boolean(correo) && correo.length > 0) {
      var EMAIL_REGEX =
        /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

      if (correo.match(EMAIL_REGEX)) {
        return true;
      } else {
        this.show_response('Formato del correo incorrecto');
      }
    } else {
      this.show_response('Campo correo vacío');
      return false;
    }
  }

  validar_observacion(observacion: string) {
    if (Boolean(observacion) && observacion.length > 0) {
      return true;
    } else {
      this.show_response('Campo observación vacío');
      return false;
    }
  }

  show_response(msg: string) {
    this.response_condicion = true;
    this.response_msg = msg;
  }

  /*GENERACION DE REPORTES */
  genereport(action = 'open') {
    var testImageDataUrl = this._actividadservice.img;
    let docDefinition = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [40, 60, 40, 60],
      content: [
        {
          columns: [
            {
              image: testImageDataUrl,
              width: 100,
              margin: [0, 0, 0, 0],
            },
            {
              text: 'CITAS MEDICAS',
              fontSize: 27,
              bold: true,
              margin: [100, 0, 0, 0],
              color: '#047886',
            },
          ],
        },
        {
          text: '',
          style: 'sectionHeader',
        },
        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            body: [
              [
                'DESCRIPCION',
                'FECHA DE CITA MEDICA',
                'HORA DE CITA MEDICA',
                'CEDULA DEL PACIENTE',
                'CEDULA DEL ACOMPAÑANTE',
                'CENTRO MEDICO',
                'ESPECIALIDAD',
                'OBSERVACIONES',

              ],
              ...this.citaM.map((row) => [
                row.descripcionCitaMedica,
                row.fechaCitaMedica.substring(0, 10),
                row.fechaCitaMedica.substring(11),
                row.paciente,
                row.acompaniante,
                row.centroMedico,
                row.especialidad,
                row.nota,
              ]),
            ],
          },
          alignment: 'center',
          margin: [20, 0, 0, 0],
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15],
          pageOrientation: 'landscape',
        },
      },
    };
    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }
  }


  actualizarAsistencia(idCitasMedicas: number, cita: CitasMedicas) {
    let nuevaAsistencia: boolean;
    if (cita.asistencia == true) {
      nuevaAsistencia = false;
    } else if (cita.asistencia == false) {
      nuevaAsistencia = true;
    }
    cita.asistencia = nuevaAsistencia;
    this.citaMedicaService.updateCita(idCitasMedicas, cita).subscribe(
      data => {
        if (data) {
          Swal.fire({
            icon: 'success',
            title: 'Se actualizó con exito!',
          });
          this.reloadData();
          this.listCentro();
          this.listEspecialidad();
          this.cita = new CitasMedicas();
          this.limpiarCampo();
        }
      }
    );
    this.actualizarPersona(cita.paciente, nuevaAsistencia);
  }

  actualizarPersona(cedula: string, nuevaAsistencia: boolean) {
    this.personaService.getUserByCedula(cedula).subscribe(dat => {
      this.personaValidar = dat;
      if (nuevaAsistencia == false) {
        if (this.personaValidar.faltas == 0) {
          const PersonaNueva: Personas = {
            apellidos: this.personaValidar.apellidos,
            beneficiario: this.personaValidar.beneficiario,
            cedula: this.personaValidar.cedula,
            celular: this.personaValidar.celular,
            correo: this.personaValidar.correo,
            direccion: this.personaValidar.direccion,
            edad: this.personaValidar.edad,
            estadoActivo: this.personaValidar.estadoActivo,
            estado_civil: this.personaValidar.estado_civil,
            fechaNacimiento: this.personaValidar.fechaNacimiento,
            genero: this.personaValidar.genero,
            idPersona: this.personaValidar.idPersona,
            nacionalidad: this.personaValidar.genero,
            nombres: this.personaValidar.nombres,
            faltas: 1
          }
          this.personaService.updatePersona(PersonaNueva).subscribe(() => {
          });
          Swal.fire({
            icon: 'success',
            title: 'Se actualizó con exito!',
          });
          const contador = timer(2000);
          contador.subscribe((n) => {
            window.location.reload();
          });
        } else {
          const PersonaNueva: Personas = {
            apellidos: this.personaValidar.apellidos,
            beneficiario: this.personaValidar.beneficiario,
            cedula: this.personaValidar.cedula,
            celular: this.personaValidar.celular,
            correo: this.personaValidar.correo,
            direccion: this.personaValidar.direccion,
            edad: this.personaValidar.edad,
            estadoActivo: this.personaValidar.estadoActivo,
            estado_civil: this.personaValidar.estado_civil,
            fechaNacimiento: this.personaValidar.fechaNacimiento,
            genero: this.personaValidar.genero,
            idPersona: this.personaValidar.idPersona,
            nacionalidad: this.personaValidar.genero,
            nombres: this.personaValidar.nombres,
            faltas: this.personaValidar.faltas + 1
          }
          this.personaService.updatePersona(PersonaNueva).subscribe(() => {
          });
          Swal.fire({
            icon: 'success',
            title: 'Se actualizó con exito!',
          });
          const contador = timer(2000);
          contador.subscribe((n) => {
            window.location.reload();
          });
        }

      } else if (nuevaAsistencia == true) {
        if (this.personaValidar.faltas <= 0) {
          Swal.fire({
            icon: 'success',
            title: 'Se actualizó con exito!',
          });
          const contador = timer(2000);
          contador.subscribe((n) => {
            window.location.reload();
          });
        } else if (this.personaValidar.faltas > 0) {
          const PersonaNueva: Personas = {
            apellidos: this.personaValidar.apellidos,
            beneficiario: this.personaValidar.beneficiario,
            cedula: this.personaValidar.cedula,
            celular: this.personaValidar.celular,
            correo: this.personaValidar.correo,
            direccion: this.personaValidar.direccion,
            edad: this.personaValidar.edad,
            estadoActivo: this.personaValidar.estadoActivo,
            estado_civil: this.personaValidar.estado_civil,
            fechaNacimiento: this.personaValidar.fechaNacimiento,
            genero: this.personaValidar.genero,
            idPersona: this.personaValidar.idPersona,
            nacionalidad: this.personaValidar.genero,
            nombres: this.personaValidar.nombres,
            faltas: this.personaValidar.faltas - 1
          }
          this.personaService.updatePersona(PersonaNueva).subscribe(() => {
          });
          Swal.fire({
            icon: 'success',
            title: 'Se actualizó con exito!',
          });
          const contador = timer(2000);
          contador.subscribe((n) => {
            window.location.reload();
          });
        }


      }
    });
  }
}