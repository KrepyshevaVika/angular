import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { INode }  from '../types/types';

const url = "http://localhost:8080/nodes";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  constructor(private http: HttpClient){ }
      
  getTopNodes(): Observable<INode[]> {
    //return this.http.get(`${host}:${port}/nodes`).subscribe((data:INode[]) => this.nodes=data);
    return this.http.get<INode[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getNodeById(id: number): Observable<INode> {
    return this.http.get<INode>(`${url}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getNodeChildren(id: number): Observable<INode[]> {
    return this.http.get<INode[]>(`${url}/${id}/children`)
      .pipe(
        catchError(this.handleError)
      );
  }

  insert(data: INode): Observable<INode> {
    return this.http.post<INode>(url, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  remove(id: number): Observable<any> {
    return this.http.delete<any>(`${url}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(data: INode): Observable<any> {
    return this.http.put<any>(url, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllNodes(): Observable<INode[]> {
    return this.http.get<INode[]>(`${url}/all`)
      .pipe(
        catchError(this.handleError)
      );
  }

}