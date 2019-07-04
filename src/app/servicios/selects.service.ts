import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { SesionStoreService } from '../servicios/sesion-store.service'

@Injectable({
  providedIn: 'root'
})
export class SelectsService {
  private _datosPrevision: any = {};
  constructor(private sessionstore: SesionStoreService, private httpClient: HttpClient) { }





  webService(url:string):Observable<any>{
    const urlLoco: string = 'http://localhost:8080/api/v1/pacientes/' + url;
  
    const httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': this.sessionstore.token
      })
    };

    return this.httpClient.get(urlLoco,httpOptions2);
  }

  
}
