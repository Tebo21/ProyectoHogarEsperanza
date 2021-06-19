import {Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef} from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import { CitasMedicas } from '../../models/citas-medicas';
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
  selector: 'app-calendar-prueba',
  templateUrl: './calendar-prueba.component.html',
  styleUrls: ['./calendar-prueba.component.css']
})
export class CalendarPruebaComponent implements OnInit {

  ngOnInit(): void {
    this.listEvents();
  }

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  citaM: CitasMedicas[] = [];

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


  events: CalendarEvent[] = [];

  listEvents(): CalendarEvent[]{
    this.citaService.listCitas().subscribe(data => {
      
      this.citaM = data;
      console.log('DATA');
      console.log(data);

      for( let i = 0; i < this.citaM.length; i++){
        this.events = [
          {
            start: addHours(new Date(), 2),
            end: addHours(new Date(), 2),
            title: this.citaM[i].descripcionCitaMedica,
            color: colors.yellow,
            actions: this.actions,
            resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          draggable: true,
          
        },
        
      ];
      /*console.log('DESCRIPCIONNNNN')
      console.log(this.citaM[i].descripcionCitaMedica);*/
    }
    });
    return this.events;
  }

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private citaService: CitaMedicaService) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
        /*console.log('TITLE2');
        console.log(events[0].title);
        console.log('DATE2');
        console.log(events[0].start);
        console.log(events[0].end);*/
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        console.log('EVENT');
        console.log(event);
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
