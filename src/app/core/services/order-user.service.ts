import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderUserService {

  constructor(private apiService: ApiService,) { }
  getOrderById(id:string):Observable<any>{
    return this.apiService.get(`/order/${id}`)
  }
  getAllOrders(id:string):Observable<any>{
    return this.apiService.get(`/order/my-orders/${id}`)
  }
  
  createOrder(body:any):Observable<any>{
    console.log(body)
     return this.apiService.post('/order', body).pipe(

      tap(() => {
        console.log(body)
        alert("creamos");
      }
      )
    );
  }
  updateOrder(body:any):Observable<any>{
  return  this.apiService.post('order',body).pipe(
      tap(() => {
        console.log(body)
        alert("actualizamos y creamos uno mas");
      }
      )
    )
  }
}
