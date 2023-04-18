import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderUserService } from 'src/app/core/services/order-user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  paramsId:any
  $route!:Subscription

  constructor(private activateRoute:ActivatedRoute,private orderService:OrderUserService,) { }

  ngOnInit(): void {
    this.$route = this.activateRoute.params.subscribe(
      (data)=>{
        this.paramsId = data
        console.log( this.paramsId.id)
        this.orderService.getOrderById(this.paramsId.id).subscribe(data=>{
          console.log(data)
        })
      }
    )
  }

}
