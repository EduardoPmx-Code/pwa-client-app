import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
//import { v4 as uuidv4 } from 'uuid';

export interface CartProduct {
  description: any;
  _id: string;
 // id: string; // Agregamos la propiedad id al objeto CartProduct
  title: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  
  private cart: CartProduct[] = [];
  private cartSubject = new BehaviorSubject<CartProduct[]>(this.cart);
  public cartlength = 0;
  
  constructor() { 
    this.cartSubject.subscribe((data)=>{
      this.cartlength = data.length;
    });
  }
  getTotalPrice(): number {
    let totalPrice = 0;
    for (let i = 0; i < this.cart.length; i++) {
      totalPrice += this.cart[i].price * this.cart[i].quantity;
    }
    return totalPrice;
  }

  getCart(): Observable<CartProduct[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(product: CartProduct): void {
    const index = this.cart.findIndex(item => item._id === product._id);
    if (index === -1) {
      product.quantity = product.quantity || 1;
      this.cart.push(product);
    } else {
      this.cart[index].quantity += product.quantity;
    }
    this.cartSubject.next(this.cart);
    this.cartlength = this.cart.length;
  }

  removeFromCart(productId: string): void {
    const index = this.cart.findIndex(product => product._id === productId); // Buscamos el índice del producto correspondiente en el carrito según su id
    if (index !== -1) {
      this.cart.splice(index, 1); // Eliminamos el producto del carrito
      this.cartSubject.next(this.cart);
      this.cartlength = this.cart.length; // Actualizamos la longitud del carrito
    }
  }

  clearCart(): void {
    this.cart = [];
    this.cartSubject.next(this.cart);
    this.cartlength = 0;
  }
}