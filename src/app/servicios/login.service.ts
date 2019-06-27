import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  endpoint: string ='http://localhost:8080/login/usuario/';

  headers: HttpHeaders;
  
  nombre: string = 'angularFront';
  pass: string = '12345';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.nombre + ':' +this.pass)      
    })
    
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  

  constructor(private httpClient: HttpClient) { }

  getLogin(): Observable<any> {
    return this.httpClient.get(this.endpoint + '?usuario=desarrollo&password=desarrollo').pipe(
      map(this.extractData));
  }
}
