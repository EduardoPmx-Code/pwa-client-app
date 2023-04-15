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
 
  readonly items = [
      'https://www.cloudways.com/blog/wp-content/uploads/Smart-Watch.jpg',
      'https://www.cloudways.com/blog/wp-content/uploads/Smart-Watch.jpg',
      'https://www.cloudways.com/blog/wp-content/uploads/Smart-Watch.jpg',
      'https://www.cloudways.com/blog/wp-content/uploads/Smart-Watch.jpg',
      'https://www.cloudways.com/blog/wp-content/uploads/Smart-Watch.jpg',
      'https://www.cloudways.com/blog/wp-content/uploads/Smart-Watch.jpg',
  ];
  index2 = 2;
 
  readonly items2 = [
      'John Cleese',
      'Eric Idle',
      'Michael Palin',
      'Graham Chapman',
      'Terry Gilliam',
      'Terry Jones',
  ];

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
   this.$products = this.productsServices.getAllProducts().subscribe(
       (data)=>{
         this.productsList= data
         console.log(this.productsList)
       }
     )
   }

}
