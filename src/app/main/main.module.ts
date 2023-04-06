import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { TuiLinkModule, TuiLoaderModule } from '@taiga-ui/core';
import {TuiActionModule, TuiCarouselModule, TuiIslandModule, TuiMarkerIconModule, TuiPaginationModule} from '@taiga-ui/kit';
import { FooterComponent } from '../shared/components/footer/footer.component';

@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    TuiLoaderModule,
    TuiActionModule,
    TuiMarkerIconModule,
    TuiCarouselModule,
    TuiIslandModule,
    TuiPaginationModule,
    TuiLinkModule,
  ]
})
export class MainModule { }
