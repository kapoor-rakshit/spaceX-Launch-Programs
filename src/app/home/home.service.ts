import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private httpOptions = {
    headers: new HttpHeaders({
    'Content-Type':  'application/json'
    })
  };

  constructor(private server: ConfigService, private _http: HttpClient) { }

  getAllData() {
    return this._http.get(`${this.server.baseURL}`, this.httpOptions).pipe(catchError((err: Error) => 
    { return throwError(err); }));
  }

  getFilteredData(searchString) {
    return this._http.get(`${this.server.baseURL}&${searchString}`).pipe(catchError((err: Error) => 
    { return throwError(err); }));
  }
}
