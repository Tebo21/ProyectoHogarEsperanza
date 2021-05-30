export class TipoActividad{
  idTipoActividad: number
  nombreActividad: string
  descripcionActividad: String

  constructor(idTipoActividad: number,nombreActividad: string,
    descripcionActividad: String){
      this.descripcionActividad=descripcionActividad;
      this.idTipoActividad= idTipoActividad;
      this.nombreActividad= nombreActividad;
    }
}
