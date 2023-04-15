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
  $searchProducts:Subscription | undefined;
  $searchByCategory:Subscription | undefined;
  $route! :Subscription ;
  search: any;

  constructor(private productsServices:ProductsService, private activatedRoute: ActivatedRoute,) {this.productsList=[] }

  ngOnChanges(changes: SimpleChanges): void {
   
  }
  ngOnDestroy(): void {
    this.$products?.unsubscribe()
    this.$searchByCategory?.unsubscribe()
    this.$searchProducts?.unsubscribe()
    this.$route.unsubscribe()
  }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.queryParams['search'] !== null){
    this.$route= this.activatedRoute.paramMap.subscribe(data=>{
      console.log(data)
      let res = data.get("search")?.split(':')
      console.log(res)
      if(res){
        if(res.length === 1 && res[0] === "."){
          this.initProductsList()
        }
        if(res.length === 2){
          if (res[0] === "search" || "category" ){
            if(res[0] === "search" ){
              this.$searchProducts = this.productsServices.searchproducts(res[1]).subscribe((data)=>{
                console.log(data)
                if(data.length !== 0){
                  this.productsList = data
                }else
                this.productsList =[]
          })
          }if(res[0] === "category" ){
            this.$searchByCategory = this.productsServices.getProductsByCategory(res[1]).subscribe((data)=>{
            console.log(data)
            if(data.length !== 0){
              this.productsList = data
            }else
            this.productsList =[]
           })
          }
          }else
          return
        }
      }else
        return
      
    })
    }
  }
  
  initProductsList(){
    this.$products = this.productsServices.getAllProducts().subscribe(
       (data)=>{
         this.productsList= data
         console.log(this.productsList)
       }
     )
   }
 
   
}
