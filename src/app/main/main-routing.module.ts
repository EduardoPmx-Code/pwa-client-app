import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { ProductsListComponent } from './products-list/products-list.component';

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
      path:"products-list",
      component:ProductsListComponent
    },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
