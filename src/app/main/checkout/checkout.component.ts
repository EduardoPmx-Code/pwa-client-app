import { Component,  OnDestroy,  OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { SessionService } from 'src/app/core/services/session.service';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
 
  id:any
  address:any
  paypalPay = false;
  testForm:FormGroup
  cartProducts:any
  lengthProductsByCart:number = 0
  user:any
  coords?:Array<number>
  opcionComponentsCheckout:number = 0
  state:any
  payment:any
  $user:Subscription | undefined
  $cart:Subscription | undefined
  
  
  totalPrice!:number
  constructor(private userService:UserService,
    private sesionService: SessionService,
    private cartService:ShoppingCartService,
   ) { 
      this.testForm = new FormGroup({
      testValue: new FormControl(''),
  });
  }
  ngOnDestroy(): void {
    this.$user?.unsubscribe()
    this.$cart?.unsubscribe()
  }


  ngOnInit(): void {
   this.totalPrice = this.cartService.getTotalPrice()
   this.id =SessionService.getUser()
   this.$user = this.userService.getUserById(this.id._id).subscribe((data)=>{
    this.address= data.address
    this.user = data
    })
    this.$cart =this.cartService.getCart().subscribe((data)=>{
      this.cartProducts = data
    })
    this.lengthProductsByCart = this.cartService.cartlength 
    
}
checkPayment(){
  if (this.paypalPay === true) {
    this.paypalPay= false
  }else{
    this.paypalPay = true
  }
 
}
handlerEvent(event:number){
  
switch (event) {
  case 0:
    this.opcionComponentsCheckout = event
    break;
  case 1:
    this.opcionComponentsCheckout = event
    break;
  case 2:
    this.opcionComponentsCheckout = event
    break;
  default:
    this.opcionComponentsCheckout = 0 ;
}

}



}
