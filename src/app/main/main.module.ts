import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { TUI_SANITIZER, TuiLinkModule, TuiLoaderModule, TuiSvgModule, tuiSvgOptionsProvider } from '@taiga-ui/core';
import {TuiActionModule, TuiBadgeModule, TuiCarouselModule, TuiInputModule, TuiIslandModule, TuiMarkerIconModule, TuiPaginationModule} from '@taiga-ui/kit';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';

@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    ProductsListComponent,
    OrdersComponent,
    OrderComponent,
    ProductComponent,
    ShopingCartComponent,
    CheckoutComponent,
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
    TuiSvgModule,
    TuiBadgeModule,
    TuiInputModule,
  ],
  providers:[
  {
    provide: TUI_SANITIZER,
    useClass: NgDompurifySanitizer,
  },
  tuiSvgOptionsProvider({
    srcProcessor: src => {
        const myCustomPrefix = 'icons8::';

        return String(src).startsWith(myCustomPrefix)
            ? `assets/icons8/${String(src).replace(myCustomPrefix, '')}.svg`
            : src;
    },
}),
  ]
})
export class MainModule { }
