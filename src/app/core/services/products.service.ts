import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService: ApiService,) { }

  getAllProducts(page:number,limit:number):Observable<any>{
   return this.apiService.get(`/product?page=${page}&limit=${limit}`)
}
  searchproducts(searchTerm: string, page:number , limit:number, city?: string, state?: string, country?: string, ):Observable<any>{
    return this.apiService.get(`/product/search?searchTerm=${searchTerm}&page=${page}&limit=${limit}`)
  }
  getProduct(id:string):Observable<any>{
    return this.apiService.get(`/product/${id}`)
  }
  getCategories():Observable<any>{
    return this.apiService.get(`/categories`) 
  }
  getProductsByCategory(categoriId:string,page:number, limit:number, city?: string, state?: string, country?: string,){
    return this.apiService.get(`/product/category/${categoriId}?page=${page}&limit=${limit}`)
  }
}