import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product:any
  paramsId:any

  constructor(private productsServices:ProductsService, private activateRoute:ActivatedRoute,
    private cartService:ShoppingCartService, private router:Router,) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(
      (data)=>{
        this.paramsId = data
        this.productsServices.getProduct(this.paramsId.id).subscribe(
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
