import { Injectable } from '@angular/core';
import { resolve } from 'dns';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  public userLocation!: [number, number] ;
  get isUserLocationReady():boolean{
    return !!this.userLocation
  }

  constructor(private apiService:ApiService) { 
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
  createGeolocation(body:any):Observable<any>{
    return this.apiService.post('/geolocation/create',body)
  }
  getLocationsByUserId(id:string):Observable<any>{
    return this.apiService.get(`/geolocation/${id}`)
  }
}
