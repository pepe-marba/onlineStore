import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { equal } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private cartService: ShoppingCartService) { }

  getOrders(){
    return this.db.list('/orders');
  }

  getOrderByUser(userId: string){
    console.log('USER ID ', userId);
    return this.db.list('/orders', query => query.orderByChild('userId').equalTo(userId));

  }

  async placeOrder(order){
    const result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }
}
