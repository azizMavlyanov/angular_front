import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

const API_URL = environment.api.base;
const API_PREFIX = environment.api.prefix;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  public Get(endpoint: String): Observable<any> {
    return this.http
      .get(API_URL + API_PREFIX + endpoint)
      .pipe(
        map(response => {
          const json = JSON.parse(JSON.stringify(response));
          return json;
        })
      )
      .pipe(catchError(this.handleError));
  }

  public Post(endpoint: string, data: any): Observable<any> {
    return this.http
      .post(API_URL + API_PREFIX + endpoint, data)
      .pipe(catchError(this.handleError));
  }

  public Update(endpoint: string, data: any): Observable<any> {
    return this.http
      .patch(API_URL + API_PREFIX + endpoint, data)
      .pipe(catchError(this.handleError));
  }

  public Delete(endpoint: string) {
    return this.http
      .delete(API_URL + API_PREFIX + endpoint)
      .pipe(catchError(this.handleError));
  }

  //handle any error encounted while sending http request
  private handleError(error: Response | any) {
    console.error("ApiService::handleError", error);
    return throwError(error);
  }
}
