import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: string = "suicideboy";
  pass: string = "12345";
  private _usuario: any;
  private _token: string;

  urlProvisiones: string = 'localhost:8080/api/v1/pacientes/previsiones';
  
  httpOptions2 = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded',
      'Authorization': '"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGVsbGlkb3MiOiJib3lzIiwiaW5mbyBhZGljaW9uYWwiOiJIb2xhIHF1ZSB0YWwhc3VpY2lkZWJveSIsInVzZXJfbmFtZSI6InN1aWNpZGVib3kiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTYyMDc4NjYxLCJub21icmUiOiJzdWljaWRlIiwianRpIjoiNWQxMTAzNGItZGJkOC00N2M0LWI3NjYtNjgwMDcxYTBlM2YxIiwiZW1haWwiOiJzLmJveXM2NjZAZ21haWwuY29tIiwiY2xpZW50X2lkIjoiYW5ndWxhckFwcCJ9.v0WDT6FaAQqTz0zEB9r_ol4enURn0mCL0Bw2cdRgz6xPsCq_wIH5LZ15gdF8GmvsHqwX50r1ZTWMsZmNdRbvLgoaQCnk1dK2wZr80TBQ_Nw858PmKRac3zkpBC_lDdnXZLXcVDDndDfe32p9jfcnX0JSli_kYeCcLEhuUObuYtDwR0CODHnWrzxUJJrky6YA914ZHEAersfu02fQclWJA6UQDUTVXb6FwgZtErjHc4JZ_9fcc1j7zKYb6esN2c7REBoPKE5wMSDTVSgeHqSgafl8apGoMaaSvt0EDTEsV74cIwZ2oDUgCgWCmRSVBHOlfs1xpuWvCys3Wsmh7BwmPQ'
    })
  };

  constructor(private httpClient: HttpClient, public router: Router) { }

  ngOnInit() {
    //this.login();
    this.previsiones();
  }

  logear(usuario: string, pass: string):Observable<any>{
    const url: string = 'http://localhost:8080/oauth/token';

    interface UserPostResponse {
      success: boolean
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'basic ' + btoa('angularApp' + ':' + '12345')
      })
    };

    let params = new URLSearchParams();

    params.set('grant_type', 'password');
    params.set('username', usuario);
    params.set('password', pass)

    console.log(params.toString());
    

    return this.httpClient.post<any>(url, params.toString(), httpOptions ).pipe(
      catchError((err: HttpErrorResponse)=>{
        console.log(err);

        
        if (err.status == 401) {
          alert("El usuario o contraseña ingresados son incorrectos");
          this.clean();
        } else {
          alert("Existe un problema con la autenticacion de usuario");
        }
        
        return throwError(err.status);
      })
    );
  }

  guardarUsuario(accessToken: string):void{
    let datos = this.getTokenData(accessToken);
    this._usuario = datos;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string):void{
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken)
  }

  getTokenData(token: string):any{
    if(token != null){
      return JSON.parse(atob(token.split(".")[1]));
    }
    return null;      
  }

  login(usuario: string, pass: string): void{
    
    this.logear(usuario, pass).subscribe(data => {
      console.log(data);

      this.guardarUsuario(data.access_token);
      this.guardarToken(data.access_token);

      this.router.navigate(['home/inicio']);
    });

  }

  previsiones(){
    this.httpClient.get(this.urlProvisiones,this.httpOptions2).subscribe((data)=>{
      console.log(data);
    })
  }

  clean(){
    this.usuario = "";
    this.pass = "";
  }


  
/*
  this.httpClient.get(this.url + 'regiones').subscribe((data) => {
    console.log(data);
    this.regiones = data;
  })
*/


}
