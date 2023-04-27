import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class OrderUserService {

  constructor(private apiService: ApiService,private alert:AlertService) { }
  getOrderById(id:string):Observable<any>{
    return this.apiService.get(`/order/${id}`)
  }
  getAllByIdOrders(id:string,page:number , limit:number,):Observable<any>{
    return this.apiService.get(`/order/my-orders/${id}?page=${page}&limit=${limit}`)
  }
  
  createOrder(body:any):Observable<any>{
     return this.apiService.post('/order', body).pipe(

      tap(() => {
        this.alert.successTimer("order created")

      }
      )
    );
  }
  updateOrder(body:any):Observable<any>{
  return  this.apiService.post('order',body).pipe(
      tap(() => {
        this.alert.successTimer("order update")
      }
      )
    )
  }
}
