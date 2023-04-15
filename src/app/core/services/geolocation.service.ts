import { Injectable } from '@angular/core';
import { resolve } from 'dns';


@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  public userLocation: [number, number] | undefined;
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
        
      this.userLocation = [coords.latitude,coords.longitude]
      console.log(this.userLocation)
      resolve(this.userLocation)
    }),reject((err: any)=>{
      console.log(err)

    })
   });
}
}
