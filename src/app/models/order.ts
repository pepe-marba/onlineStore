import { ShippingDetails } from './shippingDetails';
import { ShoppingCart } from './shopping-cart';
export class Order{
    datePlaced: number;
    items: any[];

    constructor(public userId: string, public shippingInfo: any, shoppingCart: ShoppingCart){
        this.datePlaced = new Date().getDate();

        this.items= shoppingCart.productIds.map(function(i) {
                                                return {
                                                product: {
                                                    title: i.product.data.title,
                                                    imageUrl: i.product.data.imageUrl,
                                                    price: i.product.data.price
                                                },
                                                quantity: i.quantity,
                                                totalPrice: i.totalPrice
                                                }
                                            })
    }
}