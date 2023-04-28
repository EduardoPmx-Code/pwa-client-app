import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
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
  loader = false;

  constructor(
    private userService:UserService,
    private fb:FormBuilder,
    private router:Router,
    private alert:AlertService) {
      this.registerForm = this.fb.group({
        username: ['', [Validators.required, userNameValidator]],
        name: ['', [Validators.required, Validators.maxLength(20)]],
        lastName: ['', [Validators.required, Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6),  Validators.maxLength(12)]],
        repeatPassword: ['', Validators.required],
        id: ['', [Validators.required,Validators.minLength(4),  Validators.maxLength(20)]],
        phone: ['', [Validators.required,  Validators.maxLength(20)]],
        country: ['', [Validators.required,  Validators.maxLength(20)]],
        city: ['', [Validators.required,  Validators.maxLength(20)]],
        state: ['', [Validators.required,  Validators.maxLength(20)]],
        zip: ['', [Validators.required,  Validators.maxLength(20)]],
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
      this.loader = true
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
        if(res.status != 200 ){
          this.loader= false
          this.alert.errorTimer("error al crear al usuario")
          this.router.navigate(["/auth"])
        }else{
          this.alert.successTimer("success")
          this.loader = false
        this.router.navigate(["/auth"])
        }
        
      })
    }
  }

}
