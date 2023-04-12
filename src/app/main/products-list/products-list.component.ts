import { Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy, OnChanges{
  productsList:Array<any> 
  $products:Subscription | undefined;
  search: any;

  constructor(private productsServices:ProductsService, private activatedRoute: ActivatedRoute,) {this.productsList=[] }

  ngOnChanges(changes: SimpleChanges): void {
   
  }
  ngOnDestroy(): void {
    this.$products?.unsubscribe()
  }

  ngOnInit(): void {
    console.log("init")
    this.$products = this.initProductsList()
    if(this.activatedRoute.snapshot.queryParams['search'] !== null){
    this.activatedRoute.paramMap.subscribe(data=>{
      console.log(data)
      let res = data.get("search")
      if(res !== null)
      this.productsServices.searchproducts( res).subscribe((data)=>{
              console.log(data)
              this.productsList = data
        })
    })
    }
  }
  
  initProductsList(){
    return this.productsServices.getAllProducts().subscribe(
       (data)=>{
         this.productsList= data
         console.log(this.productsList)
       }
     )
   }
   searchHandler(){
    console.log(this.search.value)
    this.productsServices.searchproducts(this.search.value.search).subscribe((data)=>{
      this.productsList= data
          console.log(this.productsList)
          this.search.reset()
    })
  }
   
}
