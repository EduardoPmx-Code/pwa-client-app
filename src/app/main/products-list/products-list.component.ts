import { Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy{
  productsList:any
  $products:Subscription | undefined;
  $searchProducts:Subscription | undefined;
  page = 1;
  limit = 10;
  $searchByCategory:Subscription | undefined;
  $route! :Subscription ;
  search!: any

  constructor(private productsServices:ProductsService, private activatedRoute: ActivatedRoute,private route:Router) {this.productsList=[] }


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
          this.initProductsList(this.page,this.limit)

        }
        if(res.length === 2){
          this.search = res[1]
          if (res[0] === "search" || "category" ){
            if(res[0] === "search" ){
             this. searchProducts(res[1], this.page , this.limit)
          }if(res[0] === "category" ){
           this.searchByCategory(res[1], this.page , this.limit)
          }
          }else
          return
        }
      }else
        return
      
    })
    }
  }
  searchProducts(search:string,page:number,limit:number){
    this.$searchProducts = this.productsServices.searchproducts(search, page , limit).subscribe((data)=>{
      console.log(data)
      this.productsList = data
})
}
searchByCategory(category:string,page:number,limit:number){
  this.$searchByCategory = this.productsServices.getProductsByCategory(category,page,limit).subscribe((data)=>{
    console.log(data)
    if(data.length !== 0){
      this.productsList = data
    }else
    this.productsList =[]
   })
}
  
  initProductsList(page:number,limit:number){
    this.$products = this.productsServices.getAllProducts(page,limit).subscribe(
       (data)=>{
         this.productsList= data
         console.log(this.productsList)
       }
     )
   }
   loadMore(): void {
    this.page++;
    if(this.productsList.totalPages>= this.page){
      if(this.activatedRoute.snapshot.queryParams['search'] !== null){
        this.$route= this.activatedRoute.paramMap.subscribe(data=>{
          console.log(data)
          let res = data.get("search")?.split(':')
          console.log(res)
          
          if(res){
            if(res.length === 1 && res[0] === "."){
              this.initProductsList(this.page,this.limit)
            }
            if(res.length === 2){
              this.search = res[1]
              if (res[0] === "search" || "category" ){
                if(res[0] === "search" ){
                 this. searchProducts(res[1], this.page , this.limit)
              }if(res[0] === "category" ){
               this.searchByCategory(res[1], this.page , this.limit)
              }
              }else
              return
            }
          }else
            return
          
        })
        }
  }
 
  }
  loadPageold(){
    this.page = this.page -1;
    if(this.productsList.totalPages > 1 && this.productsList.currentPage >=1){
      if(this.activatedRoute.snapshot.queryParams['search'] !== null){
        this.$route= this.activatedRoute.paramMap.subscribe(data=>{
          console.log(data)
          let res = data.get("search")?.split(':')
          console.log(res)
          
          if(res){
            if(res.length === 1 && res[0] === "."){
              this.initProductsList(this.page  , this.limit)
            }
            if(res.length === 2){
              this.search = res[1]
              if (res[0] === "search" || "category" ){
                if(res[0] === "search" ){
                 this. searchProducts(res[1], this.page  , this.limit)
              }if(res[0] === "category" ){
               this.searchByCategory(res[1], this.page  , this.limit)
              }
              }else
              return
            }
          }else
            return
          
        })
        }
      }
}
  


}
