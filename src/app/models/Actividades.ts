import { Personas } from "./personas";
import { TipoActividad } from "./TipoActividad";

export class Actividades {
  public idActividadPersona: number;
  public cedulaPersona: Personas;
  public fechaActividad: Date;
  public horaInicio:Date;
	public horaFin : Date;
  public descripcionActividad: string;
  public tipoactividad: TipoActividad;
}
