import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef,} from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView,} from 'angular-calendar';
import { ActividadesService } from '../../services/actividades.service';
import { Actividades } from '../../models/Actividades';
import { PersonasService } from '../../services/personas.service';
import { Personas } from '../../models/personas';
import { DatePipe, formatDate } from '@angular/common';
import { CitaMedicaService } from '../../services/cita-medica.service';
import { TipoActividad } from '../../models/TipoActividad';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  verde: {
    primary: '#009700',
    secondary: '#00df00',
  },

};

@Component({
  selector: 'app-voluntario-calendario',
  templateUrl: './voluntario-calendario.component.html',
  styleUrls: ['./voluntario-calendario.component.css'],
})
export class VoluntarioCalendarioComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
    title: string;
    descrition: string;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event,'Nuevo',"");
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event,'Aveces',"");
      },
    },
  ];

  refresh: Subject<any> = new Subject();
  actividadView: Actividades[]=[];
  events: CalendarEvent[] = [];
  citas: CalendarEvent[]=[];
  Actividades: CalendarEvent[]=[];

  activeDayIsOpen: boolean = true;
  PersonId: string;
  Person: Personas = new Personas();
  Actividadview: Actividades[] = [];
  fecha1: Date = new Date();
  fecha2: string = this.datapipe.transform(this.fecha1, 'yyyy-MM-dd');
  fecha:Date;

  constructor(private modal: NgbModal, public actividadService: ActividadesService,
    public personaService: PersonasService, public _actividadservice: ActividadesService,
    public datapipe: DatePipe, public citaService: CitaMedicaService) {}


  ngOnInit(): void {
    this.PersonId = localStorage.getItem('cedUser');
    this.mostrarTipoActividades();
    this.mostrarCitasMedicas();
    this.addEvent();
  }

  mostrarTipoActividades(): void {
    this._actividadservice.getAll().subscribe(
      (response) => {
        response.forEach((res) => {
          if (res.cedulaPersona.cedula==this.PersonId) {
            const f=res.fechaActividad+"T"+res.horaInicio+":00";
            const f1=res.fechaActividad+"T"+res.horaFin+":00";
            const prueba=new Date(f);
            prueba.setHours(prueba.getHours() - 2)

            const prueba1=new Date(f1);
            prueba1.setHours(prueba1.getHours() - 2)
            this.Actividades=[
              ...this.Actividades,
              {
                title: res.tipoActividad.nombreActividad,
                start: addHours(new Date(prueba), 2),
                end: addHours(new Date(prueba1), 2),
                color: colors.verde,
                draggable: false,
                resizable: {
                  beforeStart: false,
                  afterEnd: false,
                },
                cssClass: 'Actividad realizada: '+ res.descripcionActividad+' \n'+'Hora de Inicio: '+ res.horaInicio +' \n'+'Hora de Finalizacion: '+ res.horaFin
              },
            ];

            this.events=[
              ...this.events,
              {
                title: res.tipoActividad.nombreActividad,
                start: addHours((new Date(prueba)), 2),
                end: addHours(new Date(prueba1), 2),
                color: colors.verde,
                draggable: false,
                resizable: {
                  beforeStart: false,
                  afterEnd: false,
                },
                cssClass: 'Actividad realizada: '+ res.descripcionActividad+' \n'+'Hora de Inicio: '+ res.horaInicio +' \n'+'Hora de Finalizacion: '+ res.horaFin
              },
            ];
          }
        });
      }
  );
  }
  a: number;

  mostrarCitasMedicas(): void {
    this.citaService.listCitas().subscribe(
      (response) => {
        response.forEach((res) => {
            const f=res.fechaCitaMedica;
            const f1=res.fechaCitaMedica;
            this.citas=[
              ...this.citas,
              {
                title: res.descripcionCitaMedica,
                start: startOfDay((new Date(f))),
                color: colors.blue,
                draggable: false,
                resizable: {
                  beforeStart: false,
                  afterEnd: false,
                },
                cssClass: "Fecha de registro de la cita medica: " + res.fechaRegistro+' \n'+'Fecha asignada: '+res.fechaCitaMedica +' \n'+'PACIENTE: '+ res.paciente +' \n'+'Acompañante: '+ res.acompaniante +' \n'+'Mail: '+ res.mensaje +' \n'+'Trabajador de la fundacion: '+ res.trabajadorFundacion +' \n'+'Centro médico: '+ res.centroMedico +' \n'+'Especialidad: '+ res.especialidad +' \n'+'Observaciones: '+ res.nota
              },


            ];

            this.events=[
              ...this.events,
              {
                title: res.descripcionCitaMedica,
                start: startOfDay((new Date(f))),
                color: colors.blue,
                draggable: false,
                resizable: {
                  beforeStart: false,
                  afterEnd: false,
                },
                cssClass: "Fecha de registro de la cita medica: " + res.fechaRegistro+' \n'+'Fecha asignada: '+res.fechaCitaMedica +' \n'+'PACIENTE: '+ res.paciente +' \n'+'Acompañante: '+ res.acompaniante +' \n'+'Mail: '+ res.mensaje +' \n'+'Trabajador de la fundacion: '+ res.trabajadorFundacion +' \n'+'Centro médico: '+ res.centroMedico +' \n'+'Especialidad: '+ res.especialidad +' \n'+'Observaciones: '+ res.nota
              },


            ];
        });
      }
  );
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[]}): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }


  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event,"","");
  }

  handleEvent(action: string, event: CalendarEvent,title:string ,descrition: string): void {
    this.modalData = { event, action,title, descrition};
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.citas.forEach((res)=>{
      console.log(res)
      this.citas=this.events;
      this.events = [
        ...this.events,
        {
          title: res.title,
          start: res.start,
          color: res.color,
          draggable: false,
          resizable: {
              beforeStart: false,
              afterEnd: false,
          },
          cssClass: res.cssClass
        },
      ];
    })
    console.log(this.events)
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
