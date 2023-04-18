import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductComponent } from './product/product.component';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutGuard } from '../core/guard/checkout.guard';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {path:'',
  component:MainComponent,
  children:[
    {
      path:"",
      redirectTo:"home",
      pathMatch: 'full'
    },
    {
      path:"home",
      component:HomeComponent
    },
    {
      path:"products-list/:search",
      component:ProductsListComponent
    },
    {
      path:"product/:id",
      component:ProductComponent
    },
    {
      path:"shopping-cart",
      component:ShopingCartComponent
    },
    {
      path:"checkout",
      component:CheckoutComponent,
      canActivate: [CheckoutGuard],
    },
    {
      path:"orders",
      component:OrdersComponent
    },
    {
      path:"order/:id",
      component:OrderComponent
    },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
