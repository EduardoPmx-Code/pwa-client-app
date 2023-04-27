import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartProduct, ShoppingCartService } from 'src/app/core/services/shopping-cart.service';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.scss']
})
export class ShopingCartComponent implements OnInit , OnDestroy {
  cartProducts: CartProduct[] = [];
  totalPrice=0;
  $cart:Subscription | undefined

  constructor(private shoppingCart:ShoppingCartService,) { }
  ngOnDestroy(): void {
   this.$cart?.unsubscribe()
  }

  ngOnInit(): void {
    this.totalPrice = this.shoppingCart.getTotalPrice()
    this.$cart = this.shoppingCart.getCart().subscribe(cart => {
      this.cartProducts = cart;
    });
  }
  removeFromCart(product:any): void {

    this.shoppingCart.removeFromCart(product);
  }
  
  clearCart(): void {
    this.shoppingCart.clearCart();
  }
  createOrder(){
   let results = this.cartProducts.map((product:any)=>({
      product:product._id,
      quantity:product.quantity
    }))
  }
}
