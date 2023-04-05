import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoLoginGuard } from './core/guards/auto-login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
  //  canLoad: [AutoLoginGuard],
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainModule),
  //  canLoad: [AutoLoginGuard],
  },
  {
    path: '**', // path empty redirect to login
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
