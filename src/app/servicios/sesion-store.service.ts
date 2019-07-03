import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SesionStoreService {
  private _usuario: any;
  private _token: string;
  constructor() { }
  
  public get user(): any{
    if(this._usuario != null){
      return this._usuario;
    } else if(this._usuario == null && sessionStorage.getItem('usuario') != null){
      this._usuario = JSON.parse(sessionStorage.getItem('usuario'));
      //console.log(this._usuario);
      return this._usuario;
    }
    return {};
  }

  public get token(): string{
    if(this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null){
      this._token = sessionStorage.getItem('token');
      //console.log(this._token);
      return this._token;
    }
    return null;
  }
}
