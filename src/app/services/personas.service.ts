import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personas } from '../models/personas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private URL='http://localhost:8080/persona';
  constructor(private http:HttpClient) { }

  postPersona(persona:Personas):Observable<any>{
    return this.http.post(`${this.URL}/creadPerosna`,persona);
  }
}
