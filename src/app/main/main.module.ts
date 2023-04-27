import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { TUI_SANITIZER, TuiButtonModule, TuiDataListModule, TuiGroupModule, TuiHostedDropdownModule, TuiLinkModule, TuiLoaderModule, TuiSvgModule, tuiSvgOptionsProvider } from '@taiga-ui/core';
import {TuiActionModule, TuiBadgeModule, TuiCarouselModule, TuiInputModule, TuiIslandModule, TuiMarkerIconModule, TuiPaginationModule, TuiProgressModule, TuiRadioBlockModule} from '@taiga-ui/kit';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiActiveZoneModule, TuiOverscrollModule } from '@taiga-ui/cdk';
import { MapComponent } from './checkout/components/map/map.component';
import { BillingComponent } from './checkout/components/billing/billing.component';
import { PaymentComponent } from './checkout/components/payment/payment.component';

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
    MapComponent,
    BillingComponent,
    PaymentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    TuiDataListModule,
    TuiHostedDropdownModule,
    TuiActiveZoneModule,
    TuiButtonModule,
    TuiGroupModule,
    TuiRadioBlockModule,
    TuiProgressModule,
    TuiOverscrollModule,
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
