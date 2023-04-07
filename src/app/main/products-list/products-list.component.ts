import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  productsList:Array<any> 
  $products:Subscription | undefined;
  constructor(private productsServices:ProductsService) {this.productsList=[] }
  ngOnDestroy(): void {
    this.$products?.unsubscribe()
  }

  ngOnInit(): void {
    this.$products = this.initProductsList()
  }
  initProductsList(){
    return this.productsServices.getAllProducts().subscribe(
       (data)=>{
         this.productsList= data
         console.log(this.productsList)
       }
     )
   }

}
