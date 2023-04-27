import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { OrderUserService } from 'src/app/core/services/order-user.service';
import { PaymentsService } from 'src/app/core/services/payments.service';
import { SessionService } from 'src/app/core/services/session.service';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
declare var paypal:any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit,AfterViewInit,OnDestroy {
  @ViewChild('paypal') paypalElement!: ElementRef;
  @Output() component = new EventEmitter<number>();
  coords!:Array<number>
  products: Array<any>=[]
  totalPrice:number =0
  user: any;

  $cart:Subscription | undefined
  $payment:Subscription | undefined
  $order:Subscription | undefined


  constructor(
    private cart:ShoppingCartService,
    private orderService:OrderUserService,
    private router:Router,
    private geolocationService:GeolocationService,
    private paymentService:PaymentsService,
    private sesionService: SessionService,
    private alert:AlertService
    ) {
   }
  ngOnDestroy(): void {
   this.$cart?.unsubscribe()
   this.$order?.unsubscribe()
   this.$payment?.unsubscribe()
  }
   ngOnInit(): void {
    this.user =SessionService.getUser()
    this.totalPrice = this.cart.getTotalPrice()
   this.coords= this.geolocationService.userLocation
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
          let amount = order.purchase_units.map((item:any )=>({
            amount:item.amount,
          }))
          let payment={
            paymentId:order.id,
            intent:order.intent,
            status:order.status,
            amount:amount[0].amount.value,
            currency:amount[0].amount.currency_code,
            clientId:this.user._id
          }
          let products:any
         this.$cart = this.cart.getCart().subscribe(data=>{
            products = data.map((item)=>({
                product:item._id,
                quantity:item.quantity
            }))
       
          })
         this.$payment= this.paymentService.savePayment(payment).subscribe((data)=>{
            const body = {products,payment:data._id}
           this.$order = this.orderService.createOrder(body).subscribe(
            (data=>{
              this.router.navigate(["main/orders"])
              this.cart.clearCart();
            })
          )
          })
          
         
        
          
        }
      },
      onError: (err: any) => {
        this.alert.errorStatic("paymen error")

      }
    })
    .render(this.paypalElement.nativeElement);
  
  }
 



  emitComponent(){
    this.component.emit(1)
  }

}
