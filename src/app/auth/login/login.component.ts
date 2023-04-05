import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/services/session.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials: FormGroup ;
  constructor(
     private router:Router,
     private fb: FormBuilder,
     private userServices:UserService,
     private sesionservice:SessionService
     ) {    
    this.credentials = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  }); }

  ngOnInit(): void {
  }
 login(){
    this.userServices.logger(this.credentials.value).subscribe(
     {
        
        next: (token) => {
          if(token != null){
            const { 
              //decodedToken ,
              user} = token;
           console.log(user)
               this.userServices.attemptAuth(user).subscribe(
                 {
                   next: () => {
                     const currentUser = SessionService.getUser();
                     if (currentUser != null) {
                       this.router.navigateByUrl('main', { replaceUrl: true });
                     } else {
                       alert("error")
                       
                     }
                    // loading
                   },
                 },
               )  
          }else{
            alert("invalid user")
          }
        },
        error: () => {
        alert("'Error al iniciar sesión'")
        },
        complete: () => {
          console.log("complete")
        },
      },
    )
  }
}


