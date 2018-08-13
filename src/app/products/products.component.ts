import { CategoryService } from './../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { Product } from '../models/product';
import { tick } from '../../../node_modules/@angular/core/testing';
import { switchMap } from '../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: any[] = [ ];
  filteredProducts: any[] = [ ];
  categories$: any;
  categoryId: string;

  constructor(productService: ProductService, categoryService: CategoryService, route: ActivatedRoute) {

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

    this.categories$ = categoryService.getAll();
  }


}
