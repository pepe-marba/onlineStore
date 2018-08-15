import { Product } from './product';

export class ProductInCart{
    // quantity: number;
    // product: Product;

    constructor(public product: Product, public quantity: number){}

    get totalPrice(){
        return this.product.data.price * this.quantity;
    }
}