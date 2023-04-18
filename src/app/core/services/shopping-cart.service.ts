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
      console.log(this.cartlength);
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
   // product.id = uuidv4(); // Generamos un id único para el producto
   const index = this.cart.findIndex(item => item._id === product._id); // Buscamos el índice del producto correspondiente en el carrito según su id

   if (index === -1) { // Si el producto no existe en el carrito, lo agregamos con cantidad 1
     product.quantity = 1;
     this.cart.push(product);
   } else { // Si el producto ya existe en el carrito, aumentamos su cantidad en 1
     this.cart[index].quantity += 1;
   }
 
   this.cartSubject.next(this.cart);
   this.cartlength = this.cart.length;
  }

  removeFromCart(productId: string): void {
    const index = this.cart.findIndex(product => product._id === productId); // Buscamos el índice del producto correspondiente en el carrito según su id
    if (index !== -1) {
      this.cart.splice(index, 1); // Eliminamos el producto del carrito
      this.cartSubject.next(this.cart);
      console.log(this.cart)
      this.cartlength = this.cart.length; // Actualizamos la longitud del carrito
    
    }
  }

  clearCart(): void {
    this.cart = [];
    this.cartSubject.next(this.cart);
    this.cartlength = 0;
  }
}