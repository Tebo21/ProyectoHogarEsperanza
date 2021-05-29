export class Donaciones{
    idDonacion?: number;
    nombreDonacion!: string;
    cantidad!: number;
    categoria!: string;
    fechaDonacion!: Date;
    descripcionDonacion!: string;

    //Relacion
    cedulaPersona!: string;
}