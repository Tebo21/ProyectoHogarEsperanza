import { Personas } from "./personas";
import { TipoActividad } from "./TipoActividad";

export class Actividades {
  public idActividadPersona: number;
  public cedulaPersona: Personas;
  public fechaActividad: string;
  public horaInicio:string;
	public horaFin : string;
  public descripcionActividad: string;
  public tipoActividad: TipoActividad;
  public asistencia: boolean;

  constructor(idActividadPersona: number,
    cedulaPersona: Personas,
    fechaActividad: string,
    horaInicio:string,
    horaFin : string,
    descripcionActividad: string,
    tipoactividad: TipoActividad,
    asistencia: boolean) {
    this.idActividadPersona = idActividadPersona,
    this.cedulaPersona = cedulaPersona,
    this.fechaActividad = fechaActividad,
    this.horaInicio = horaInicio,
    this.horaFin= horaFin,
    this.descripcionActividad = descripcionActividad,
    this.tipoActividad = tipoactividad,
    this.asistencia = asistencia
  }
}
