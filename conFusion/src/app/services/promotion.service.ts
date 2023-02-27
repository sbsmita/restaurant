import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable , of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map,catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
    private processHTTPMsgService : ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>( baseURL + 'dishes')
    .pipe(catchError(this.processHTTPMsgService.handleError));
    /*return  new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS),2000);
    });*/
  }

  getPromotion(id: string) : Observable<Promotion >{
    return of(PROMOTIONS.filter((promo)=>promo.id===id)[0]).pipe(delay(2000));
    /*return new Promise(resolve=> {
      setTimeout(() => resolve(PROMOTIONS.filter((promo)=>(promo.id===id))[0]),2000);
    });*/
  }

  getFeaturedPromotion(): Observable<Promotion>{
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true')
    .pipe(map(promo => promo[0] ))
    .pipe(catchError(this.processHTTPMsgService.handleError))
    //return of(PROMOTIONS.filter((promotion)=> promotion.featured)[0]).pipe(delay(2000));
   
  }



}
