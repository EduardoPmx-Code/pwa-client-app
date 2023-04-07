import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  constructor() { }

  ngOnInit(): void {
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
}
