import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../core/services/geolocation.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private geolocationService:GeolocationService) {
   }

  ngOnInit(): void {
    this.geolocationService.userLocation
  }

}
