import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  shipping = {};
  constructor() { }

  ngOnInit() {
  }

  placeOrder(){
    console.log(this.shipping);
  }

}
