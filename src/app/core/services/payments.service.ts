import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private apiService:ApiService) { }
  savePayment(body:any):Observable<any>{
    return this.apiService.post('/payments', body)
  }
}
