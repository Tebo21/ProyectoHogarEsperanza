import { RegistroFamiliares } from "./registro-familiares";

export class Perregficdto {
    idPerRegFicDTO?: number;
    //Persona
    cedula?: string;
    nombres?: string;
    apellidos?: string;
    direccion?: string;
    celular?: string;
    correo?: string;
    genero?: string;
    fechaNacimiento?: string;
    edad?: number;
    nacionalidad?: string;
    estado_civil?: string;
    faltas?: number;
    pareja?: boolean;
    asistencias?: number;
    //Registro Familiares
    familiares?: RegistroFamiliares[];
    //Ficha
    situacionEconomica?: string;
    tipoVivienda?: string;
    descripcionVivienda?: string;
    seguro?: boolean;
    salario?: number;
    fechaRegistro?: string;
    adultoMayor?: boolean;
    viveConOtros?: boolean;
    recibebono?: boolean;
    cantidadbono?: number;
    discapacidad?: boolean;
    tipo_discapacidad?: string;
    porc_disc_mental?: number;
    porc_disc_fisica?: number;
    enfermedades?: string[];

}