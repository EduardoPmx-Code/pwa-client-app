import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmedValidator } from 'src/app/shared/components/utils/validator-passMach';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit ,OnDestroy {
  params?:string | null
  credentials: FormGroup;
  $suscription: Subscription = new Subscription;
  loader = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private fb: FormBuilder,
    private userService:UserService,
    private alert:AlertService) { 
    this.credentials = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      repeatPassword: ['', Validators.required],
    }, {
      validator: ConfirmedValidator('password', 'repeatPassword')
    } as AbstractControlOptions); 
   }
  ngOnDestroy(): void {
   this.$suscription.unsubscribe();
  }

   

  ngOnInit(): void {
   this.params = this.activatedRoute.snapshot.queryParamMap.get("token")
   if(this.params === null){
    this.router.navigate(['/auth'])
   }
  }
  submit(){
    if (this.credentials.status != "INVALID") {
      let body ={
        token:this.params,
        password:this.credentials.value.password
      }
      this.loader = true
      this.$suscription = this.userService.resetPassword(body).subscribe((data)=>{
        this.loader = true
        if(data.status === 'changePassword'){
          this.loader = false
          this.alert.successTimer("password update")
          this.router.navigate(["/auth"])
        }else{
          this.alert.errorTimer("Error al intentar cambiar el password")
          this.loader = false
          setTimeout(() => {
            this.router.navigate(["/auth"])
          }, 1000);
         
        }
      })
      this.loader = false
    }
   
  }

}
