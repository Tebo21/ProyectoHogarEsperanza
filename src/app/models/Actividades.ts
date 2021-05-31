import { TipoActividad } from "./TipoActividad";

export class Actividades {
  public idActividadPersona: number;
  public cedulaPersona: string;
  public fechaActividad: Date;
  public horaInicio:Date;
	public horaFin : Date;
  public descripcionActividad: string;
  public tipoactividad: Array<String>;

  constructor(idActividadPersona: number,
    cedulaPersona: string,
    fechaActividad: Date,
    horaInicio:Date,
    horaFin : Date,
    descripcionActividad: string,
    tipoactividad: Array<String>) {
    this.idActividadPersona = idActividadPersona,
    this.cedulaPersona = cedulaPersona,
    this.fechaActividad = fechaActividad,
    this.horaInicio = horaInicio,
    this.horaFin= horaFin,
    this.descripcionActividad = descripcionActividad
    this.tipoactividad = tipoactividad
  }
}
