import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { RecentQuotes } from './RecentQuotes';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecentQuotesService {
  private lineOfBusinessUrl = 'api/recentQuotes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    getRecentQuotes():Observable<RecentQuotes[]>{
      return this.http.get<RecentQuotes[]>(this.lineOfBusinessUrl, this.httpOptions).pipe(
        tap(_ => this.log("fetched recent quotes")),
        catchError(this.handleError<RecentQuotes[]>('getRecentQuotes',[]))
      )
    }


    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
    private log(message: string) {
      this.messageService.add(`RecentQuotesService: ${message}`);
    }
}
