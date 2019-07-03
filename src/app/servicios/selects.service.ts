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



  public previData():any {
    this.previsiones().subscribe(data =>{
      this._datosPrevision = data;
      return this._datosPrevision;
    })
  }

  previsiones():Observable<any>{
    const urlProvisiones: string = 'http://localhost:8080/api/v1/pacientes/previsiones';
  
    const httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': this.sessionstore.token
      })
    };

    return this.httpClient.get(urlProvisiones,httpOptions2);
  }
}
