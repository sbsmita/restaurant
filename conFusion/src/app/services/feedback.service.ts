import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Direct } from 'protractor/built/driverProviders';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map,catchError } from 'rxjs/operators';
import { Feedback } from '../shared/feedback';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgService : ProcessHTTPMsgService) { }

    postFeedback(feedback: Feedback): Observable<Feedback> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.http.post<Feedback>(baseURL + 'feedback', feedback, httpOptions)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}