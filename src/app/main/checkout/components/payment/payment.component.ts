import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { OrderUserService } from 'src/app/core/services/order-user.service';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
declare var paypal:any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit,AfterViewInit {
  @ViewChild('paypal') paypalElement!: ElementRef;
  @Output() component = new EventEmitter<number>();
  products: Array<any>=[]
  totalPrice:number =0


  constructor(
    private cart:ShoppingCartService,
    private orderService:OrderUserService,
    private router:Router
    ) {
   }
   ngOnInit(): void {
    this.totalPrice = this.cart.getTotalPrice()
   }
  ngAfterViewInit(): void {
    paypal
    .Buttons({
      createOrder: (data:any, actions:any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value:  this.totalPrice
              }
            }
          ]
        });
      },
      onApprove: async (data:any, actions:any) => {
        const order = await actions.order.capture();

        if(order){
          let products:any
          this.cart.getCart().subscribe(data=>{
            products = data.map((item)=>({
                product:item._id,
                quantity:item.quantity
            }))
       
          })
          const body = {products}
        
          this.orderService.createOrder(body).subscribe(
            (data=>{
              alert("orden creada exitosamente")
              this.router.navigate(["main/orders"])
              this.cart.clearCart();
            })
          )
        }
        console.log(order);
      },
      onError: (err: any) => {
        console.log(err);
        alert("error en el pago ")

      }
    })
    .render(this.paypalElement.nativeElement);
  
  }


  emitComponent(){
    this.component.emit(1)
  }

}
