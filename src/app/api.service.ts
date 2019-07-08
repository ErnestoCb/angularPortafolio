import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Articulo } from './clases/articulo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  endpoint: string ='http://localhost:8080/api/v1/';

  headers: HttpHeaders;
  
  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa("angularFront:12345")      
    })
    
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  constructor(private httpClient: HttpClient) { }

  getArticulos(): Observable<any> {
    return this.httpClient.get(this.endpoint + 'articulos').pipe(
      map(this.extractData));
  }

  getArticulosById(id): Observable<any> {
    return this.httpClient.get(this.endpoint + 'articulos/' + id).pipe(
      map(this.extractData));
  }

  addArticulos (articulo): Observable<any> {
    console.log(articulo);
    return this.httpClient.post<any>(this.endpoint + 'articulos', JSON.stringify(articulo), this.httpOptions).pipe(
      tap((product) => console.log(`added product w/ id=${product.id}`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }
  /*
  updateProduct (id, product): Observable<any> {
    return this.http.put(endpoint + 'products/' + id, JSON.stringify(product), httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }
  
  deleteProduct (id): Observable<any> {
    return this.http.delete<any>(endpoint + 'products/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }
*/
  
  
  
  
  
  
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
