import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/interfaces/user.model';
import { SessionService } from 'src/app/core/services/session.service';
import { UserService } from 'src/app/core/services/user.service';
declare var paypal:any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('paypal', { static: true })
  paypalElement!: ElementRef;
  product = {
    price: 777.77,
    description: 'used couch, decent condition',
    img: 'assets/couch.jpg'
  };
  paidFor = false;
  id:any
  address:any
  paypalPay = false;
  constructor(private userService:UserService,private sesionService: SessionService) { }

  ngOnInit(): void {
   this.id =SessionService.getUser()
   console.log(this.id)
    this.userService.getUserById(this.id._id).subscribe((data)=>{
    this.address= data.address
    })
    paypal
    .Buttons({
      createOrder: (data:any, actions:any) => {
        return actions.order.create({
          purchase_units: [
            {
              description: this.product.description,
              amount: {
                currency_code: 'USD',
                value: this.product.price
              }
            }
          ]
        });
      },
      onApprove: async (data:any, actions:any) => {
        const order = await actions.order.capture();
        this.paidFor = true;
        console.log(order);
      },
      onError: (err: any) => {
        console.log(err);
      }
    })
    .render(this.paypalElement.nativeElement);
}
checkPayment(){
  if (this.paypalPay === true) {
    this.paypalPay= false
  }else{
    this.paypalPay = true
  }
 
}

}
