import { ProductInCart } from './productInCart';
export class ShoppingCart{

    constructor(public items: ProductInCart[]){}

    get productIds(){
        return Object.keys(this.items);
    }

    get totalItemsCount(){
      let count = 0;
      for(let productId in this.items){
        count += this.items[productId].quantity;
      }
      return count;
    }
}