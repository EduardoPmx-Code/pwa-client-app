import { Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss','./products-list.component.less']
})
export class ProductsListComponent implements OnInit, OnDestroy{
  productsList:any
  $products:Subscription | undefined;
  $searchProducts:Subscription | undefined;
  page = 1;
  limit = 12;
  loader = true
  $searchByCategory:Subscription | undefined;
  $route! :Subscription ;
  search!: any


  constructor(private productsServices:ProductsService,
     private activatedRoute: ActivatedRoute,
     private route:Router,
     private cartService:ShoppingCartService,
     private alert:AlertService) {this.productsList=[] }


  ngOnDestroy(): void {
    this.$products?.unsubscribe()
    this.$searchByCategory?.unsubscribe()
    this.$searchProducts?.unsubscribe()
    this.$route.unsubscribe()
  }



  handlersParamsUrl() {
    if (this.activatedRoute.snapshot.queryParams['search'] !== null) {
      this.$route = this.activatedRoute.paramMap.subscribe((data) => {
        let res: any = data.get('search')?.split(':');

        if (res) {
          if (res.length === 1 && res[0] === '.') {
            this.initProductsList(this.page, this.limit);
          }
          if (res.length === 2) {
            this.search = res[1];
            if (res[0] === 'search' || res[0] === 'category') {
              if (res[0] === 'search') {
                this.searchProducts(res[1], this.page, this.limit);
              }
              if (res[0] === 'category') {
                this.searchByCategory(res[1], this.page, this.limit);
              }
            } else {
              return;
            }
          }
        } else {
          return;
        }
      });
    }
  }

  ngOnInit(): void {
    this.handlersParamsUrl();
  }

  searchProducts(search: string, page: number, limit: number) {
    this.$searchProducts = this.productsServices.searchproducts(search, page, limit).subscribe((data) => {
      this.loader = false;
      if (data.length !== 0) {
        this.productsList = data;
      } else {
        this.productsList = [];
      }
    });
  }

  searchByCategory(category: string, page: number, limit: number) {
    this.$searchByCategory = this.productsServices.getProductsByCategory(category, page, limit).subscribe((data) => {
      this.loader = false;
      if (data.length !== 0) {
        this.productsList = data;
      } else {
        this.productsList = [];
      }
    });
  }

  initProductsList(page: number, limit: number) {
    this.$products = this.productsServices.getAllProducts(page, limit).subscribe((data) => {
      this.loader = false;
      this.productsList = data;
    });
  }

  loadMore(): void {
    this.page++;
    if (this.productsList.totalPages >= this.page) {
      this.handlersParamsUrl();
      window.scroll({
        top: 100,
      })
    }
  }

  loadPageOld() {
    if (this.page > 1) {
      this.page--;
      this.handlersParamsUrl();
      window.scroll({
        top: 100,
      })
    }
  }
  addCart(product:any){
    product.quantity =1
    this.cartService.addToCart(product)
    this.alert.successTimer("success")
  }


}
