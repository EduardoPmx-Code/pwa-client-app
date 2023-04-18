import { Component, OnInit } from '@angular/core';
import { OrderUserService } from 'src/app/core/services/order-user.service';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  id:any
  orders!:Array<any>

  constructor(
    private orderService:OrderUserService,
    private Session:SessionService) {
   }

  ngOnInit(): void {
    
   
   this.id =SessionService.getUser()
   console.log(this.id)
    this.orderService.getAllByIdOrders(this.id._id).subscribe(data=>{
      console.log(data)
      this.orders = data
    })
  }

}
