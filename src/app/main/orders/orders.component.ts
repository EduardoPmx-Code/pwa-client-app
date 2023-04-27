import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderUserService } from 'src/app/core/services/order-user.service';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit,OnDestroy {
  id:any
  orders!:any
  page = 1;
  limit = 10;
  loader = true
  $order:Subscription | undefined
  constructor(
    private orderService:OrderUserService,
    private Session:SessionService) {
   }
  ngOnDestroy(): void {
   this.$order?.unsubscribe()
  }

  ngOnInit(): void {
   this.id =SessionService.getUser()
   this.$order = this.orderService.getAllByIdOrders(this.id._id,this.page,this.limit).subscribe(data=>{
      this.loader = false
      this.orders = data
    })
  }

}
