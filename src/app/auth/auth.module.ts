import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TuiIslandModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiLinkModule } from '@taiga-ui/core';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    AuthComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TuiIslandModule,
    TuiButtonModule,
    TuiLinkModule,
  ],
})
export class AuthModule { }
