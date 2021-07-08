import { Component, OnInit } from '@angular/core';
import * as AWS from 'aws-sdk';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-documentos-persona',
  templateUrl: './documentos-persona.component.html',
  styleUrls: ['./documentos-persona.component.css']
})
export class DocumentosPersonaComponent implements OnInit {
  file: File;
  showImagen = false;
  error = false;
  subiendo = false;
  archivo = null;
  urlImagen = null;
   response_condicion: boolean = true;
  response_msg: string = 'Exito';
  submitted = false;
  url = null;
  uploadPercent: Observable<number>;

  
  Bucketname = 'archivosbeneficiarioshe';
  s3 = new AWS.S3({
    apiVersion: '2012-10-17',
    params: {Bucket: 'archivosbeneficiarioshe'}
  });
  photoSelected : string | ArrayBuffer;
  constructor() {
    AWS.config.region = 'us-east-1';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:fb312f74d8e8ec197b58af1cdc73e1064592a464f77b1e23e6cbdaf3fb23b910',
    });
   }

  ngOnInit(): void {
  }
readUrl(event:any){
  if(event.target.files && event.target.files[0]){
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.url = event.target.result
    }
    reader.readAsDataURL(event.target.files[0]);
  }
}
onChange = (event:any) => {
  if(event.target.files.length > 0){
    this.archivo = event.target.files[0];
    const reader = new FileReader();
     reader.onload = e => this.photoSelected = reader.result;
     reader.readAsDataURL(this.archivo);
   }
}
onClickSubir = async (event:any) =>{
  event.preventDefault();
  if(this.archivo){
    try {
      this.subiendo =true;
      const data = await new AWS.S3.ManagedUpload({
        params: {
          Bucket : this.Bucketname,
          Key: this.archivo.name,
          Body: this.archivo,
          ACL: 'public-read',
        },
      }).promise();
      this.urlImagen = data.Location;
      this.subiendo = false;
      this.showImagen = true;
    } catch (error) {
      this.error =true;
      const bucle = setInterval(() => {
        this.error = false;
        clearInterval(bucle);
       }, 2000);
      }
    }else{
      alert('Seleccione una imagen')
    }
  }
}


