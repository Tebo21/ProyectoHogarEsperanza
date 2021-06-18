import { Input, Pipe, PipeTransform, TemplateRef } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

   resultPost:[];

  transform(members: any, filters: any): any {
    return this.resultPost=members.filter(item => {
    return (item.cedulaPersona.cedula.toLowerCase().indexOf(filters.cedula.toLowerCase()) >= 0 && item.cedulaPersona.nombres.toLowerCase().indexOf(filters.nombre.toLowerCase()) >= 0  && item.cedulaPersona.apellidos.toLowerCase().indexOf(filters.apellido.toLowerCase()) >= 0 && item.cedulaPersona.correo.toLowerCase().indexOf(filters.correo.toLowerCase()) >= 0 && item.cedulaPersona.nacionalidad.toLowerCase().indexOf(filters.nacionalidad.toLowerCase()) >= 0 && item.fechaActividad.toLowerCase().indexOf(filters.fecha.toLowerCase()) >= 0 && item.horaInicio.toLowerCase().indexOf(filters.hinicio.toLowerCase()) >= 0 && item.horaFin.toLowerCase().indexOf(filters.hfin.toLowerCase()) >= 0  && item.descripcionActividad.toLowerCase().indexOf(filters.actividad.toLowerCase()) >= 0 && item.tipoActividad.nombreActividad.toLowerCase().indexOf(filters.Tactividad.toLowerCase()) >= 0);
    });
    console.log(this.resultPost)

  }
}


