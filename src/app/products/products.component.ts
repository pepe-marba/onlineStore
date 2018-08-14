import { ShoppingCartService } from './../services/shopping-cart.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { switchMap } from '../../../node_modules/rxjs/operators';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: any[] = [ ];
  filteredProducts: any[] = [ ];
  categoryId: string;
  cart: any;
  subscription: Subscription;

  constructor(
    productService: ProductService,
    private cartService: ShoppingCartService,
    route: ActivatedRoute) {

    // productService.getAll().subscribe(product => {
    //   this.products = product;

    //   // we need to have information in the products array in order to filter the products
    //   // when the page is loaded for the first time
    //   // if we don't do it in this way, our product observable and the queryParamMap observable
    //   // don't know when the other is finished, so products can't be filtered correctly
    //   route.queryParamMap.subscribe(params => {
    //     this.categoryId = params.get('category');

    //     this.filteredProducts = (this.categoryId) ?
    //       this.filteredProducts = this.products.filter(p => p.data.category === this.categoryId) :
    //       this.products;

    //   });

    // });

    // we replaced the previous implementation in order to avoid having a suscriber inside another suscriber 
    // queryParam subscriber inside products suscriber
    // With this implementation we swtich from the first suscriber (GetAll products) to the second one QueryParams suscriber

    productService.getAll()
      .pipe(switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      }))
      .subscribe(params => {
        this.categoryId = params.get('category');

        this.filteredProducts = (this.categoryId) ?
          this.products.filter(p => p.data.category === this.categoryId) :
          this.products;
      });
  }

  async ngOnInit(){
    this.subscription = (await this.cartService.getCart()).subscribe(cart => this.cart = cart);
    console.log("this cart", this.cart);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
