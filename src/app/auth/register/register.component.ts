import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm:FormGroup
  credentias:any
  $register:Subscription | undefined;

  constructor(
    private userService:UserService,
    private fb:FormBuilder,
    private router:Router) {
    this.registerForm = this.fb.group({
      username:['',Validators.required],
      name:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      repeatPassword:['',Validators.required],
      id:['',Validators.required],
      country:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      zip:['',Validators.required],
    })
   }
  ngOnDestroy(): void {
    this.$register?.unsubscribe()
  }

  ngOnInit(): void {
  }

  register(){
    let maped= []
    maped.push(this.registerForm.value)

    this.credentias= maped.map((res)=>({
      username:res.username,
      email:res.email,
      password:res.password,
      id:res.id,
      name:res.name,
      lastName:res.lastName,
      address:{
        country: res.country,
        city:res.city,
        state:res.state,
        zip:res.zip
      }
    }))


     this.$register =this.userService.registerUser(this.credentias[0]).subscribe(res=>{
      console.log(res)
      this.router.navigate(["/auth"])
    })
  }

}
