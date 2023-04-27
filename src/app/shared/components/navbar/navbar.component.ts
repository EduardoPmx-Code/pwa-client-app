import { Component, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiDialogService, TuiSizeL, TuiSizeS } from '@taiga-ui/core';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  cartProducts=0
  search:FormGroup;
  $productLengt!:Subscription;
  dropdownOpen = false;
  size: TuiSizeL | TuiSizeS = 's';


  constructor(private cart:ShoppingCartService,private fb: FormBuilder, private router:Router,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,private userService:UserService,
    private el: ElementRef) {
    this.search= this.fb.group({
      search:['']
    })
   }

  ngOnInit(): void {
   this.$productLengt = this.cart.getCart().subscribe(
      (data=>{
        this.cartProducts = data.length
      })
    )
    
  }
  searchHandler(){
    this.router.navigate([`/main/products-list/search:${ this.search.value.search }`])
    this.search.reset()
  }
  selectOption(item: string): void {
    this.dropdownOpen = false;
    this.dialogs.open(`You selected ${item}`).subscribe();
}

  ngOnDestroy(): void {
  this.$productLengt.unsubscribe()
   }
   logOut(){
    this.userService.purgeAuth()
   }
   closeNav() {
    this.el.nativeElement.querySelector('.navbar-collapse').classList.remove('show');
  }

}
