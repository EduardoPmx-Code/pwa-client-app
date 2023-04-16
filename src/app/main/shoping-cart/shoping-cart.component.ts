import { Component, OnInit } from '@angular/core';
import { CartProduct, ShoppingCartService } from 'src/app/core/services/shopping-cart.service';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.scss']
})
export class ShopingCartComponent implements OnInit {
  cartProducts: CartProduct[] = [];
  totalPrice=0;

  constructor(private shoppingCart:ShoppingCartService,) { }

  ngOnInit(): void {
    this.totalPrice = this.shoppingCart.getTotalPrice()
    this.shoppingCart.getCart().subscribe(cart => {
      this.cartProducts = cart;
    });
    console.log(this.cartProducts)
  }
  removeFromCart(product:any): void {

    this.shoppingCart.removeFromCart(product);
  }
  
  clearCart(): void {
    this.shoppingCart.clearCart();
  }
  createOrder(){
    console.log(this.cartProducts)
   let results = this.cartProducts.map((product:any)=>({
      product:product._id,
      quantity:product.quantity
    }))
    console.log(results)
   /* this.orderService.createOrder(results).subscribe((data)=>{
      //console.log(data)
      this.order = data
      this.clearCart()
      this.router.navigate([`main/shopping-cart/${ this.order._id}`])
      //console.log(this.order)
    })*/
  }
}
