import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService: ApiService,) { }

  getAllProducts():Observable<any>{
   return this.apiService.get('/product')
}
  searchproducts(params:string):Observable<any>{
    return this.apiService.get(`/product/search?searchTerm=${params}`)
  }
  getProduct(id:string):Observable<any>{
    return this.apiService.get(`/product/${id}`)
  }
  getCategories():Observable<any>{
    return this.apiService.get(`/categories`) 
  }
  getProductsByCategory(categoriId:string){//example
    return this.apiService.get(`/product/category/${categoriId}`)
  }
}