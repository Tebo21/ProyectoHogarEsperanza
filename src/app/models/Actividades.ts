import { TipoActividad } from "./TipoActividad";

export class Actividades {
  public idActividadPersona: number;
  public cedulaPersona: string;
  public fechaActividad: Date;
  public descripcionActividad: string;
  public tipoactividad: Array<String>;

  constructor(idActividadPersona: number,
    cedulaPersona: string,
    fechaActividad: Date,
    descripcionActividad: string,
    tipoactividad: Array<String>) {
    this.idActividadPersona = idActividadPersona,
    this.cedulaPersona = cedulaPersona,
    this.fechaActividad = fechaActividad,
    this.descripcionActividad = descripcionActividad
    this.tipoactividad = tipoactividad
  }
}
