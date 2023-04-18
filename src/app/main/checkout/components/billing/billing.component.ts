import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  @Input () user: any;
  @Output() component = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  emitComponent(){
    this.component.emit(1)
  }

}
