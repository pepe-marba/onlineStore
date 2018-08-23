import { ShoppingCartService } from './../services/shopping-cart.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { switchMap } from '../../../node_modules/rxjs/operators';
import { Subscription, Observable } from '../../../node_modules/rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any[] = [ ];
  filteredProducts: any[] = [ ];
  categoryId: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private route: ActivatedRoute) {

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

  }

  async ngOnInit(){
    this.cart$ = (await this.cartService.getCart());
    this.populateProducts();

  }

  private applyFilter(){

    this.filteredProducts = (this.categoryId) ?
    this.products.filter(p => p.data.category === this.categoryId) :
    this.products;
  }

  private populateProducts(){



    this.productService.getAll()
      .pipe(switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      }))
      .subscribe(params => {
        this.categoryId = params.get('category');
        this.applyFilter();
      });
  }


}
