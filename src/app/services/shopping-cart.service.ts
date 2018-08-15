import { ProductInCart } from './../models/productInCart';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '../../../node_modules/angularfire2/database';
import { Product } from '../models/product';
import { pipe, Observable } from '../../../node_modules/rxjs';
import { take, map } from '../../../node_modules/rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId()
    console.log('CartId ', cartId);
    return this.db.object<ShoppingCart>('/shopping-carts/' + cartId).valueChanges()
      .pipe(map(x => new ShoppingCart(x.items)));
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();

  }

  private getItem(cartId: string, productId: string){
    return this.db.object("/shopping-carts/" + cartId + '/items/' + productId);
  }

  
  // To convert a async method to a sync method
  private async getOrCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key; 

    // this is replaced for a async call to the asyncronous method
    // this.create().then(result => {
    //   localStorage.setItem('cartId', result.key);
    //   return this.getCart(result.key);
    // });
  }

  async addToCart(product:Product){
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product){
    this.updateItemQuantity(product,-1);
  }

  private async updateItemQuantity(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId,product.key);

    item$.valueChanges().pipe(take(1))
      .subscribe(
       (item:ProductInCart) => {
          item$.update({product: product, quantity: (item ? item.quantity : 0) + change});
        }
      );
  }
}
