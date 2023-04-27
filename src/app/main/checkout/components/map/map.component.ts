import {  AfterViewInit, Component, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import  {Map, Popup, Marker}  from 'mapbox-gl';
import { SessionService } from 'src/app/core/services/session.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements  AfterViewInit,OnInit,OnDestroy {
  @ViewChild("mapDiv")mapDivElement!:ElementRef
  geoLocation!:[number,number];
  @Output() component = new EventEmitter<number>();
  @Output() cords = new EventEmitter<Array<number>>();
  user!:any
  formsaveLocation: FormGroup;
  Locations?:Array<any>
  $geolocationByUser:Subscription | undefined
  $geolocationSave:Subscription | undefined
  constructor( 
    private geolocationService:GeolocationService,
    private sesionService:SessionService,
    fb: FormBuilder) { 
      this.formsaveLocation= fb.group({
        name:["",Validators.required],
        save:[false,Validators.required]
       });
    }
  ngOnDestroy(): void {
    this.$geolocationByUser?.unsubscribe()
    this.$geolocationSave?.unsubscribe()
  }
  ngOnInit(): void {
    this.user = SessionService.getUser()
    this.$geolocationByUser = this.geolocationService.getLocationsByUserId(this.user.id).subscribe(data=>{
      this.Locations = data.map((location:any):any=>({
        name:location.name,
        longitude:location.longitude,
        latitude:location.latitude
      }))

      this.Locations?.push(this.geoLocation)
    })
    this.geoLocation = this.geolocationService.userLocation
   // throw new Error('Method not implemented.');
    
  }
  ngAfterViewInit():void {
 
   this.emitCoors()
   this.initMap()

  }
  initMap(){
  if(!this.geolocationService.userLocation)throw new Error("map not found")

    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center:this.geoLocation, //this.geolocationService.userLocation,
      zoom:14
    });
    const popup = new Popup().setHTML("<h6>estas aqui</h6>");
    new Marker({
      color:"red"
    }).setLngLat(this.geoLocation).setPopup(popup).addTo(map)
  }

  emitComponent(state:number){
    if(this.formsaveLocation.value.save == true){
      let body = {
        userId:this.user._id,
        name:this.formsaveLocation.value.name,
        longitude:this.geoLocation[0],
        latitude:this.geoLocation[1]
      }
      this.saveLocation(body)
    }
    
    this.component.emit(state)
  }
  emitCoors(){
    this.cords.emit(this.geoLocation)
  }

  saveLocation(body:any){
   this.$geolocationSave= this.geolocationService.createGeolocation(body).subscribe((data)=>{
    })
  }

}
