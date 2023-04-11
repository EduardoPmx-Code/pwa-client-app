import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image:string;
}

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {
  
  private cart: CartProduct[] = [];
  private cartSubject = new BehaviorSubject<CartProduct[]>(this.cart);
  public cartlength = 0
  constructor() { 
    this.cartSubject.subscribe((data)=>{
      
      this.cartlength = data.length
      console.log(this.cartlength)
    })
  }

  getCart(): Observable<CartProduct[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(product: CartProduct): void {
  /* const existingProduct = this.cart.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      this.cart.push(product);
    }*/
   this.cart.push(product);
    this.cartSubject.next(this.cart);
  }

  removeFromCart(productId:any): void {
    const index = this.cart.findIndex(p => p.id === productId);
    if (index >= 0) {
      this.cart.splice(index, 1);
      this.cartSubject.next(this.cart);
      this.cart.length
    }
  }

  clearCart(): void {
    this.cart = [];
    this.cartSubject.next(this.cart);
  }
}


