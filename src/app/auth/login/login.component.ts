import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { SessionService } from 'src/app/core/services/session.service';
import { UserService } from 'src/app/core/services/user.service';
import { userNameValidator } from 'src/app/shared/components/utils/validator-username';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {
  credentials: FormGroup ;
  $loggerSubscribe:Subscription | undefined;
  $attemptAuth:Subscription | undefined;
  loader = false
  constructor(
     private router:Router,
     private fb: FormBuilder,
     private userServices:UserService,
     private sesionservice:SessionService,
     private alert:AlertService
     ) {    
    this.credentials = this.fb.group({
    username: ['', [Validators.required, userNameValidator]],
    password: ['', [Validators.required]],
  }); }
  ngOnDestroy(): void {
  //  this.$loggerSubscribe?.unsubscribe()
  //  this.$attemptAuth?.unsubscribe()
  }

  ngOnInit(): void {
  }
 login(){
  this.loader = true
   this.$loggerSubscribe = this.userServices.logger(this.credentials.value).subscribe(
     {
        
        next: (token) => {
          if(token != null){
            const { 
              //decodedToken ,
              user} = token;
              this.$attemptAuth =  this.userServices.attemptAuth(user).subscribe(
                 {
                   next: () => {
                     const currentUser = SessionService.getUser();
                     
                     if (currentUser != null) {
                      
                       this.router.navigateByUrl('main', { replaceUrl: true });
                     } else {
                       this.alert.errorTimer("error")
                     
                     }
                     this.loader = false
                   },
                 },
               )  
          }else{
            this.alert.errorTimer("invalid user")

          }
        },
        error: () => {
          this.alert.errorTimer("Error Auth")
        },
        complete: () => {
          this.loader = false
        },
      },
    )
  }
}


