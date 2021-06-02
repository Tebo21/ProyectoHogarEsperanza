import { Personas } from './personas';
export class CitasMedicas {
    // tslint:disable-next-line: variable-name
    id_citas: number;
    descripcion: string;
    fechaRegistro: Date;
    fehaCita: Date;
    paciente: Personas;
    acompañante: Personas;
    mensaje: string;
    trabajador: Personas;
    especialidad: string;
    nota: string;
    idCentroMedico: number;
}
