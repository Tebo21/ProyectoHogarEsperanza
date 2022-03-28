import { Component, OnInit } from '@angular/core';
import { FichaSocioeconomica } from 'src/app/models/ficha-socioeconomica';
import { FichaSocioeconomicaService } from 'src/app/services/ficha-socioeconomica.service';
import { PersonasService } from 'src/app/services/personas.service';
import { Personas } from '../../models/personas';
import { timer } from 'rxjs';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  data: any;
  data2: any;
  data3: any;
  data4: any;
  data5: any;
  data6: any;
  data7: any;
  chartOptions: any;
  ListadoFichas: FichaSocioeconomica[];
  ListaMadres: FichaSocioeconomica[];
  ListaNoMadres: FichaSocioeconomica[];
  ListaAdultos: FichaSocioeconomica[];
  ListaAdultosNo: FichaSocioeconomica[];
  ListaDis: FichaSocioeconomica[];
  ListaDisNo: FichaSocioeconomica[];
  ListaBono: FichaSocioeconomica[];
  ListaBonoNo: FichaSocioeconomica[];
  ListaDInt: FichaSocioeconomica[];
  ListaDFis: FichaSocioeconomica[];
  ListaDisAm: FichaSocioeconomica[];
  ListaDisNi: FichaSocioeconomica[];
  ListadoPersonas: Personas[];
  ListaMas: Personas[];
  ListaFem: Personas[];
  Lenero: String[];
  Lfebrero: String[];
  Lmarzo: String[];
  Labril: String[];
  Lmayo: String[];
  Ljunio: String[];
  Ljulio: String[];
  Lagosto: String[];
  Lseptiembre: String[];
  Loctubre: String[];
  Lnoviembre: String[];
  Ldiciembre: String[];
  madreS: number;
  madreNS: number;
  adultos: number;
  adultosNo: number;
  bono: number;
  bonoNo: number;
  discapFi: number;
  discapIn: number;
  discapAm: number;
  discapNi: number;
  mas: number;
  fem: number;
  dis: number;
  disNo: number;
  total: number;
  ficha: FichaSocioeconomica = {};
  enero: number;
  febrero: number;
  marzo: number;
  abril: number;
  mayo: number;
  junio: number;
  julio: number;
  agosto: number;
  septiembre: number;
  octubre: number;
  noviembre: number;
  diciembre: number;

  constructor(private fichaService: FichaSocioeconomicaService, private personaService: PersonasService) { }

  ngOnInit(): void {
    this.ListadoFichas = []
    this.ListaMadres = []
    this.ListaNoMadres = []
    this.ListaAdultos = []
    this.ListaAdultosNo = []
    this.ListaDis = []
    this.ListaDisNo = []
    this.ListaBono = []
    this.ListaBonoNo = []
    this.ListaDInt = []
    this.ListaDFis = []
    this.ListaDisAm = []
    this.ListaDisNi = []
    this.ListaMas = []
    this.ListaFem = []
    this.Lenero = []
    this.Lfebrero = []
    this.Lmarzo = []
    this.Labril = []
    this.Lmayo = []
    this.Ljunio = []
    this.Ljulio = []
    this.Lagosto = []
    this.Lseptiembre = []
    this.Loctubre = []
    this.Lnoviembre = []
    this.Ldiciembre = []
    this.cargarDatos();
  }

  cargarDatos() {
    this.fichaService.getficha().subscribe(lista => {
      this.ListadoFichas = lista;
      for (let index = 0; index < this.ListadoFichas.length; index++) {
        this.ficha = this.ListadoFichas[index];
        if (this.ficha.madreSoltera == true) {
          this.ListaMadres.push(this.ficha)
        } else if (this.ficha.madreSoltera == false) {
          this.ListaNoMadres.push(this.ficha)
        }
        if (this.ficha.adultoMayor == true) {
          this.ListaAdultos.push(this.ficha)
        } else if (this.ficha.adultoMayor == false) {
          this.ListaAdultosNo.push(this.ficha)
        }
        if (this.ficha.discapacidad == true) {
          this.ListaDis.push(this.ficha)
        } else if (this.ficha.discapacidad == false) {
          this.ListaDisNo.push(this.ficha)
        }
        if (this.ficha.recibebono == true) {
          this.ListaBono.push(this.ficha)
        } else if (this.ficha.recibebono == false) {
          this.ListaBonoNo.push(this.ficha)
        }
        if (this.ficha.tipo_discapacidad == 'Fisica') {
          this.ListaDFis.push(this.ficha)
        } else if (this.ficha.tipo_discapacidad == 'Intelectual') {
          this.ListaDInt.push(this.ficha)
        } else if (this.ficha.tipo_discapacidad == 'Ambas') {
          this.ListaDisAm.push(this.ficha)
        } else if (this.ficha.tipo_discapacidad == 'Ninguna') {
          this.ListaDisNi.push(this.ficha)
        }
        let fecha = this.ficha.fechaRegistro.split('-')
        const dia = fecha[0];
        const mes = fecha[1];
        const anio = fecha[2];
        if (mes == '01') {
          this.Lenero.push(mes);
        } else if (mes == '02') {
          this.Lfebrero.push(mes)
        } else if (mes == '03') {
          this.Lmarzo.push(mes)
        } else if (mes == '04') {
          this.Labril.push(mes)
        } else if (mes == '05') {
          this.Lmayo.push(mes)
        } else if (mes == '06') {
          this.Ljunio.push(mes)
        } else if (mes == '07') {
          this.Ljulio.push(mes)
        } else if (mes == '08') {
          this.Lagosto.push(mes)
        } else if (mes == '09') {
          this.Lseptiembre.push(mes)
        } else if (mes == '10') {
          this.Loctubre.push(mes)
        } else if (mes == '11') {
          this.Lnoviembre.push(mes)
        } else if (mes == '12') {
          this.Ldiciembre.push(mes)
        }
      }
      this.total = this.ListadoFichas.length
      this.madreS = this.ListaMadres.length
      this.madreNS = this.ListaNoMadres.length
      this.adultos = this.ListaAdultos.length
      this.adultosNo = this.ListaAdultosNo.length
      this.dis = this.ListaDis.length
      this.disNo = this.ListaDisNo.length
      this.bono = this.ListaBono.length
      this.bonoNo = this.ListaBonoNo.length
      this.discapFi = this.ListaDFis.length
      this.discapIn = this.ListaDInt.length
      this.discapAm = this.ListaDisAm.length
      this.discapNi = this.ListaDisNi.length
      this.enero = this.Lenero.length
      this.febrero = this.Lfebrero.length
      this.marzo = this.Lmarzo.length
      this.abril = this.Labril.length
      this.mayo = this.Lmayo.length
      this.junio = this.Ljunio.length
      this.julio = this.Ljulio.length
      this.agosto = this.Lagosto.length
      this.septiembre = this.Lseptiembre.length
      this.octubre = this.Loctubre.length
      this.noviembre = this.Lnoviembre.length
      this.diciembre = this.Ldiciembre.length
    });
    this.personaService.getUserByEstadoYTipo(true, true).subscribe(data => {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element.genero == 'Masculino') {
          this.ListaMas.push(element);
        } else if (element.genero == 'Femenino') {
          this.ListaFem.push(element);
        }
      }
      this.mas = this.ListaMas.length
      this.fem = this.ListaFem.length
      const contador = timer(1000);
      contador.subscribe((n) => {
        this.crearPastel();
      })

    });
  }

  crearPastel() {
    this.data = {
      labels: ['Si', 'No'],
      datasets: [
        {
          data: [this.madreS, this.madreNS],
          backgroundColor: [
            "#E0BBE4",
            "#FFDFD3"
          ],
          hoverBackgroundColor: [
            "#E0BBE4",
            "#FFDFD3"
          ]
        }
      ]
    };

    this.data2 = {
      labels: ['Si', 'No'],
      datasets: [
        {
          data: [this.adultos, this.adultosNo],
          backgroundColor: [
            "#FF9E9E",
            "#FFF5CC"
          ],
          hoverBackgroundColor: [
            "#FF9E9E",
            "#FFF5CC"
          ]
        }
      ]
    };

    this.data3 = {
      labels: ['Si', 'No'],
      datasets: [
        {
          data: [this.dis, this.disNo],
          backgroundColor: [
            "#FFBCA6",
            "#FFE0AB"
          ],
          hoverBackgroundColor: [
            "#FFBCA6",
            "#FFE0AB"
          ]
        }
      ]
    };

    this.data4 = {
      labels: ['Si', 'No'],
      datasets: [
        {
          data: [this.bono, this.bonoNo],
          backgroundColor: [
            "#957DAD",
            "#D291BC"
          ],
          hoverBackgroundColor: [
            "#957DAD",
            "#D291BC"
          ]
        }
      ]
    };

    this.data5 = {
      labels: ['Ninguna', 'Intelectual', 'Fisica', 'Ambas'],
      datasets: [
        {
          data: [this.discapNi, this.discapIn, this.discapFi, this.discapAm],
          backgroundColor: [
            "#D2BCA2",
            "#35628A",
            "#78C6D1",
            "#FFF5D1"
          ],
          hoverBackgroundColor: [
            "#D2BCA2",
            "#35628A",
            "#78C6D1",
            "#FFF5D1"
          ]
        }
      ]
    };

    this.data6 = {
      labels: ['Masculino', 'Femenino'],
      datasets: [
        {
          data: [this.mas, this.fem],
          backgroundColor: [
            "#D2BCA2",
            "#FFF5D1"
          ],
          hoverBackgroundColor: [
            "#D2BCA2",
            "#FFF5D1"
          ]
        }
      ]
    };

    this.data7 = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [{
        type: 'bar',
        label: 'Beneficiarios',
        backgroundColor: '#8CCC37',
        data: [
          this.enero,
          this.febrero,
          this.marzo,
          this.abril,
          this.mayo,
          this.junio,
          this.julio,
          this.agosto,
          this.septiembre,
          this.octubre,
          this.noviembre,
          this.diciembre
        ]
      }]
    };

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };

  }

  

}
