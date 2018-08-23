import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from '../models/order';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart;
  shipping = {};
  userSubscription: Subscription;
  userId: string;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }


  async placeOrder() {

    const order = new Order(this.userId, this.shipping, this.cart);

    console.log('new Order to save: ', order);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

}
