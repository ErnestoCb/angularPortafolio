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
  usuario: string = "";
  pass: string = "123456";
  private _usuario: any;
  private _token: string;

  constructor(private httpClient: HttpClient, public router: Router) { }

  ngOnInit() {
  }

  logear(usuario: string, pass: string):Observable<any>{
    const url: string = 'http://localhost:8080/oauth/token';

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
