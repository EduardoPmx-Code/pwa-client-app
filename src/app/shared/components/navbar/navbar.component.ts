import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cartProducts=0

  constructor(private cart:ShoppingCartService) { }

  ngOnInit(): void {
    this.cart.getCart().subscribe(
      (data=>{
        this.cartProducts = data.length
      })
    )
  }

}
