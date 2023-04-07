import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CartProduct, ShoppingCartService } from '../services/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {
  constructor(private cart:ShoppingCartService,private router: Router){}
  canActivate(){
    if(this.cart.cartlength ===0){
      this.router.navigate(["/main"])
      return false
    }else{
      return true
    }
    
  }
  
}
