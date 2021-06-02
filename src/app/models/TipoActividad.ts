export class TipoActividad{
  idTipoActividad: number
  nombreActividad: string
  descripcionActividad: string

  constructor(idTipoActividad: number,nombreActividad: string,
    descripcionActividad: string){
      this.descripcionActividad=descripcionActividad;
      this.idTipoActividad= idTipoActividad;
      this.nombreActividad= nombreActividad;
    }
}
