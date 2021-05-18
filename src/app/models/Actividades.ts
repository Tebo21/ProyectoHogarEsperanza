export class Actividades {
  private idActividadPersona: number;
  private cedulaPersona: string;
  private fechaActividad: string;
  private descripcionActividad: string;
  private tipoactividad: string;

  constructor(idActividadPersona: number,
    cedulaPersona: string,
    fechaActividad: string,
    descripcionActividad: string,
    tipoactividad: string) {
    this.idActividadPersona = idActividadPersona,
    this.cedulaPersona = cedulaPersona,
    this.fechaActividad = fechaActividad,
    this.descripcionActividad = descripcionActividad
    this.tipoactividad = tipoactividad
  }
}
