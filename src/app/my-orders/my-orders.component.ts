import { switchMap } from 'rxjs/operators';
import { OrderService } from './../services/order.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  userId: string;
  orders$: Observable<{}>;

  constructor(private authService: AuthService, private orderService: OrderService) {
    this.orders$ = this.authService.user$
      .pipe(
          switchMap( u => {
              return orderService.getOrderByUser(u.uid).valueChanges();
            }));
  }

}
