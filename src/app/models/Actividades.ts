import { Personas } from "./personas";
import { TipoActividad } from "./TipoActividad";

export class Actividades {
  public idActividadPersona: number;
  public cedulaPersona: Personas;
  public fechaActividad: Date;
  public horaInicio:Date;
	public horaFin : Date;
  public descripcionActividad: string;
  public tipoActividad: TipoActividad;

  constructor(idActividadPersona: number,
    cedulaPersona: Personas,
    fechaActividad: Date,
    horaInicio:Date,
    horaFin : Date,
    descripcionActividad: string,
    tipoactividad: TipoActividad) {
    this.idActividadPersona = idActividadPersona,
    this.cedulaPersona = cedulaPersona,
    this.fechaActividad = fechaActividad,
    this.horaInicio = horaInicio,
    this.horaFin= horaFin,
    this.descripcionActividad = descripcionActividad
    this.tipoActividad = tipoactividad
  }
}
