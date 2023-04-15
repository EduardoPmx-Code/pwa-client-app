import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  product:any
  paramsId:any
  $route!:Subscription
  $product!:Subscription

  constructor(private productsServices:ProductsService, private activateRoute:ActivatedRoute,
    private cartService:ShoppingCartService, private router:Router,) { }
  ngOnDestroy(): void {
    this.$product.unsubscribe();
    this.$route.unsubscribe();
  }

  ngOnInit(): void {
   this.$route = this.activateRoute.params.subscribe(
      (data)=>{
        this.paramsId = data
       this.$product = this.productsServices.getProduct(this.paramsId.id).subscribe(
          (data)=>{
            console.log(data)
            this.product = data
          }
        )
      }
    )
  }
  addACart(){
    this.product.quantity =1

    this.cartService.addToCart(this.product)
    
    this.router.navigate(["/main/shopping-cart"])
}

}
