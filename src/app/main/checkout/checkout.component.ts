import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import  {Map, Popup, Marker}  from 'mapbox-gl';
import { User } from 'src/app/core/interfaces/user.model';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { SessionService } from 'src/app/core/services/session.service';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  @ViewChild("mapDiv")mapDivElement!:ElementRef
  id:any
  address:any
  paypalPay = false;
  testForm:FormGroup
  cartProducts:any
  lengthProductsByCart:number = 0
  user:any
  geoLocation:[number,number]|undefined;
  totalPrice!:number
  constructor(private userService:UserService,
    private sesionService: SessionService,
    private cartService:ShoppingCartService,
    private geolocationService:GeolocationService) { 
      this.testForm = new FormGroup({
      testValue: new FormControl(''),
  });
  }
  ngAfterViewInit(): void {

    if(!this.geolocationService.userLocation)throw new Error("map not found")

      const map = new Map({
        container: this.mapDivElement.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v12',
        center:[-62.7215398,8.2849173], //this.geolocationService.userLocation,
        zoom:14
      });
      const popup = new Popup().setHTML("<h6>estas aqui</h6>");
      new Marker({
        color:"red"
      }).setLngLat([-62.7215398,8.2849173]).setPopup(popup).addTo(map)
    
   
  }

  ngOnInit(): void {
   this.totalPrice = this.cartService.getTotalPrice()
    this.geoLocation = this.geolocationService.userLocation
    console.log(this.geoLocation)
   this.id =SessionService.getUser()
   console.log(this.id)
    this.userService.getUserById(this.id._id).subscribe((data)=>{
    this.address= data.address
    this.user = data
    console.log(this.user)
    })
    this.cartService.getCart().subscribe((data)=>{
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

}
