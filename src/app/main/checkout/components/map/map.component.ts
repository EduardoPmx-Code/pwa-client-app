import {  AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import  {Map, Popup, Marker}  from 'mapbox-gl';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements  AfterViewInit,OnInit {
  @ViewChild("mapDiv")mapDivElement!:ElementRef
  geoLocation!:[number,number];
  @Output() component = new EventEmitter<number>();

  constructor( private geolocationService:GeolocationService) { }
  ngOnInit(): void {
    this.geoLocation = this.geolocationService.userLocation
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit():void {
   this.initMap()
  }
  initMap(){
  console.log(this.geoLocation)
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
    this.component.emit(state)
  }

}
