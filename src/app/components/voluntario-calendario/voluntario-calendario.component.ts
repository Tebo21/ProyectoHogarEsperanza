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
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  actividadView: Actividades[]=[];


  events: CalendarEvent[] = [
    /*{
      start: subDays(startOfDay(new Date('2021-05-18T03:24:00')), 1),
      end: addDays(new Date('2021-06-18T03:25:00'), 2),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date('2021-05-18T15:24:00')),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },*/
  ];

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
    this.PersonId = localStorage.getItem('carisma');
    this.mostrarTipoActividades();
    console.log(this.Actividadview);
    console.log(this.fecha);
    this.mostrarCitasMedicas();
  }

  mostrarTipoActividades(): void {
    this._actividadservice.getAll().subscribe(
      (response) => {
        response.forEach((res) => {
          if (res.cedulaPersona.cedula==this.PersonId) {
            console.log(res.cedulaPersona.nombres)

            this.Actividadview.push(res);
            const f=res.fechaActividad+"T"+res.horaFin+":00";
            const f1=res.fechaActividad+"T"+res.horaFin+":00";
            this.events=[
              ...this.events,
              {
                title: res.descripcionActividad,
                start: startOfDay(new Date(f)),
                end: endOfDay(new Date(f1)),
                color: colors.red,
                draggable: true,
                resizable: {
                  beforeStart: true,
                  afterEnd: true,
                },
              },
            ];


          }

        });
        this.Actividadview=response
        console.log(this.Actividadview)
      }
  );
  }
  a: number;

  mostrarCitasMedicas(): void {
    this.citaService.listCitas().subscribe(
      (response) => {
        response.forEach((res) => {
            this.Actividadview.push(res);
            const f=res.fechaCitaMedica;
            const f1=res.fechaCitaMedica;
            this.events=[
              ...this.events,
              {
                title: res.descripcionCitaMedica,
                start: startOfDay(new Date(f)),
                end: endOfDay(new Date(f1)),
                color: colors.blue,
                draggable: true,
                resizable: {
                  beforeStart: true,
                  afterEnd: true,
                },
              },

              
            ]; 
        });
        this.Actividadview=response
        console.log(this.Actividadview)
      }
  );
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
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
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];

    console.log(this.events.map((res)=>{res.start.getTime}))
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
