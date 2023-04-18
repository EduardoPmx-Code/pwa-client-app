import { Injectable } from '@angular/core';
import { resolve } from 'dns';


@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  public userLocation!: [number, number] ;
  get isUserLocationReady():boolean{
    return !!this.userLocation
  }

  constructor() { 
    this.getUserLocation()
  }

  getUserLocation():Promise<[number,number]>{
   return new Promise((resolve,reject)=>{
    navigator.geolocation.getCurrentPosition(
      ({coords})=>{
        
      this.userLocation = [coords.longitude , coords.latitude,]
      console.log(this.userLocation)
      resolve(this.userLocation)
    }),reject((err: any)=>{
      console.log(err)

    })
   });
}
}
