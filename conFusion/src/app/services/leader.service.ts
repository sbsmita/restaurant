import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { resolve } from 'url';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { promise } from 'protractor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private processHTTPMsg: ProcessHTTPMsgService) { }

  getLeaderDetail(): Observable<Leader[]>{
    return this.http.get<Leader[]>(baseURL + 'leadership')
        .pipe(catchError(this.processHTTPMsg.handleError));
    /*return new Promise(resolve => {
      setTimeout(()=> resolve(LEADERS),2000); 
    });*/
  }

  getSpecificLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leadership/' + id)
    .pipe(catchError(this.processHTTPMsg.handleError));

    //return of(LEADERS.filter((Leader)=> (Leader.id===id))[0]).pipe(delay(2000));
    /*return new Promise(resolve => {
     setTimeout(()=> resolve(LEADERS.filter((Leader)=> (Leader.id===id))[0]),2000);
    });*/
  }

  getFeaturedLeader(): Observable<Leader>{
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(leaders => leaders[0]))
    .pipe(catchError(this.processHTTPMsg.handleError));

    //return of(LEADERS.filter((Leader)=> Leader.featured)[0]).pipe(delay(2000));
    /*return  new Promise(resolve => {
     setTimeout(()=> resolve(LEADERS.filter((Leader)=> Leader.featured)[0]),2000);
    }); */
  }

}
