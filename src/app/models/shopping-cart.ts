import { ShoppingCartService } from './../services/shopping-cart.service';
import { ProductInCart } from './productInCart';
import { forEach } from '../../../node_modules/@angular/router/src/utils/collection';
import { Product } from './product';
export class ShoppingCart{

    itemsWithPrice: ProductInCart[] = [];
    productInCart: ProductInCart;
    constructor(public items: ProductInCart[] = []){}

    get productIds(){
      // console.log('My items', this.items);
      // tslint:disable-next-line:forin
      for (const id in this.items){
        this.productInCart = new ProductInCart(this.items[id].product, this.items[id].quantity);
        this.itemsWithPrice.push(this.productInCart);
      }
      // return Object.keys(this.items);
      // console.log('Items with price ', this.itemsWithPrice);
      return this.itemsWithPrice;
    }


    getQuantity(product: Product) {
     
      const item = this.items[product.key];
      return item ? item.quantity : 0;
    }

    get totalCartPrice(){
      let sum = 0;
      // tslint:disable-next-line:forin
      for (const id in this.items){
        sum += this.items[id].quantity * this.items[id].product.data.price;
      }

      return sum;
    }

    get totalItemsCount(){
      let count = 0;
      // tslint:disable-next-line:forin
      for (const productId in this.items){
        count += this.items[productId].quantity;
      }
      return count;
    }
}