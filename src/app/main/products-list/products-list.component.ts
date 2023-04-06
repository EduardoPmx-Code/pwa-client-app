import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  productsList:Array<any> 
  $products:Subscription | undefined;
  constructor(private productsServices:ProductsService) {this.productsList=[] }

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
