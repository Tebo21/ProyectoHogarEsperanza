export class FichaSocioeconomica {
    _id?: number;
    idFichaSocioeconomica?: number;
    cedulaPersona?: String;
    situacionEconomica?: String;
    tipoVivienda?:String;
    descripcionVivienda?: String;
    seguro?:String;
    discapacidad?:boolean;
    discapacidadDescipcion?: String;
    nacionalidad?:String;
    estadoCivil?:String;
    salario?: DoubleRange;
    fechaRegistro?:String;
    adultoMayor?:boolean;
    viveConOtros?:boolean;
}
