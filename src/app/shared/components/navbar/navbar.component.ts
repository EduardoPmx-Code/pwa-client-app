import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  cartProducts=0
  search:FormGroup;
  productList$!:Subscription;

  constructor(private cart:ShoppingCartService,private fb: FormBuilder, private router:Router) {
    this.search= this.fb.group({
      search:['']
    })
   }

  ngOnInit(): void {
    this.cart.getCart().subscribe(
      (data=>{
        this.cartProducts = data.length
      })
    )
    
  }
  searchHandler(){
    this.router.navigate([`/main/products-list/${ this.search.value.search }`])
    this.search.reset()
  }

  ngOnDestroy(): void {
    this.productList$.unsubscribe()
   }

}
