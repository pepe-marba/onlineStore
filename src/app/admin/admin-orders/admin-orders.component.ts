import { OrderService } from 'shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {

  orders$: Observable<{}[]>;

  constructor(private orderService: OrderService) {
    this.orders$ = this.orderService.getOrders().valueChanges();
  }

}
