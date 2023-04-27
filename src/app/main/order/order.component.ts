import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderUserService } from 'src/app/core/services/order-user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit,OnDestroy {
  paramsId:any
  $route!:Subscription
  $order!:Subscription
  order:any
  loader = true
  constructor(private activateRoute:ActivatedRoute,private orderService:OrderUserService,) { }
  ngOnDestroy(): void {
    this.$route.unsubscribe()
  }

  ngOnInit(): void {
    this.$route = this.activateRoute.params.subscribe(
      (data)=>{
        this.paramsId = data
        this.$order =this.orderService.getOrderById(this.paramsId.id).subscribe(data=>{
         this.order = data
         this.loader = false
        })
      }
    )
  }

}
