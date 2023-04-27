import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmedValidator } from 'src/app/shared/components/utils/validator-passMach';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit,OnDestroy {
  credentials: FormGroup ;
  $suscription:Subscription | undefined
  constructor(  
    private fb: FormBuilder,
    private userService:UserService,
    private router:Router,
    private alert:AlertService
    ) {
    this.credentials = this.fb.group({ 
      email:['', [Validators.required, Validators.email]],
   })
  }
  ngOnDestroy(): void {
    this.$suscription?.unsubscribe()
  }

  ngOnInit(): void {
  }
  submit(){
   this.$suscription= this.userService.recoveryPassword(this.credentials.value).subscribe((data)=>{
      this.alert.infoTimer("Send email",1000)
      this.router.navigate(["/auth"])
    });
  }

}
