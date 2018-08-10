import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { Product } from '../../models/product';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  filteredProducts: any[];
  susbcription: Subscription;

  constructor(private productService: ProductService) {
    this.susbcription = this.productService.getAll()
          .subscribe(p => this.filteredProducts = this.products = p);
  }

  filter(query: string){
    console.log(query);
    this.filteredProducts = (query) ?
      this.products.filter(p => p.data.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy(){
    this.susbcription.unsubscribe();
  }

  ngOnInit() {
  }

}
