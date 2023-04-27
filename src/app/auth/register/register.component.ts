import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmedValidator} from 'src/app/shared/components/utils/validator-passMach';
import { userNameValidator } from 'src/app/shared/components/utils/validator-username';

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
        username: ['', [Validators.required, userNameValidator]],
        name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
        lastName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
        repeatPassword: ['', Validators.required],
        id: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
        phone: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
        country: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
        city: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
        state: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
        zip: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      }, {
        validator: ConfirmedValidator('password', 'repeatPassword')
      } as AbstractControlOptions);
    }
   
  ngOnDestroy(): void {
    this.$register?.unsubscribe()
  }

  ngOnInit(): void {
  }


  register(){
    let maped= []
    maped.push(this.registerForm.value)

    if (this.registerForm.status != "INVALID") {

      this.credentias= maped.map((res)=>({
        username:res.username,
        email:res.email,
        password:res.password,
        id:res.id,
        name:res.name,
        lastName:res.lastName,
        phone:res.phone,
        address:{
          country: res.country,
          city:res.city,
          state:res.state,
          zip:res.zip
        }
      }))
      this.$register =this.userService.registerUser(this.credentias[0]).subscribe(res=>{
        this.router.navigate(["/auth"])
      })
    }
  }

}
