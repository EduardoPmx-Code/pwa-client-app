import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit ,OnDestroy {
  categories :any
  productsList:any
  index = 0;
  $categories!:Subscription
  $products!:Subscription
  page = 1;
  limit = 10;
 

  constructor(private productsServices:ProductsService) { }
  ngOnDestroy(): void {
    this.$categories.unsubscribe();
    this.$products.unsubscribe();
  }

  ngOnInit(): void {
  this.$categories=  this.productsServices.getCategories().subscribe((data)=>{
      this.categories = data
      console.log(this.categories)
     })
     this.initOrderList()
  }
  initOrderList(){
   this.$products = this.productsServices.getAllProducts(this.page,this.limit).subscribe(
       (data)=>{
         this.productsList= data.items
         console.log(this.productsList)
       }
     )
   }

}
