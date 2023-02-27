import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
//import { DISHES } from '../shared/dishes';
import { promise } from 'protractor';
import { resolve } from 'url';
import { Observable, of } from  'rxjs';
import { delay } from 'rxjs/operators';
import { Direct } from 'protractor/built/driverProviders';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map,catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient,
    private processHTTPMsgService : ProcessHTTPMsgService) { }
  
  getDishes(): Observable<Dish[]>{
    return this.http.get<Dish[]>( baseURL + 'dishes')
    .pipe(catchError(this.processHTTPMsgService.handleError));
    //return of(DISHES).pipe(delay(2000)); --use when not  fetching from server
      //return new Promise(resolve => {
      //setTimeout(()=>resolve(DISHES),2000);
  }
  

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>( baseURL + 'dishes/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
    //return of(DISHES.filter((dish)=> dish.featured)[0]).pipe(delay(2000));--not from server
    //return new Promise(resolve => {
    // setTimeout(()=> resolve(DISHES.filter((dish)=> (dish.id===id))[0]),2000);
    //});
  }
/*
  this.servicedish.getdish().subscribe((data)=>{
    console.log('data').
    this.dishall=data.
  })*/

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>( baseURL + 'dishes?featured=true')
    .pipe(map(dishes => dishes[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
    //return of(DISHES.filter((dish)=> dish.featured)[0]).pipe(delay(2000));//using obervables which then convertd to promise
    //return new Promise(resolve=> {
    //setTimeout(() => resolve(DISHES.filter((dish)=> dish.featured)[0]),2000);
    //});
  } 

  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
    .pipe(catchError(error=> error));
    //return of(DISHES.map(dish => dish.id )); --not from server
  }
  putDish(dish:Dish): Observable<Dish>{
    const httpOptions={
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.put<Dish>(baseURL +'dishes/' +dish.id,dish,httpOptions) 
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }



}
