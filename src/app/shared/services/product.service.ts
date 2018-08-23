import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../../../node_modules/angularfire2/database';
import { map } from '../../../../node_modules/rxjs/operators';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product){
    this.db.list('/products').push(product);
  }

  getAll(){
    return this.db.list('/products')
        .snapshotChanges()
        .pipe(map (items => {
          return items.map(a => {
            const data = a.payload.val() as Product;
            const key = a.payload.key;
            return {key, data};
          });
        }));
  }

  get(productId){
    console.log('PRODUCT from ID', this.db.object('/products/' + productId).valueChanges());
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product){
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }
}
// return this.db.list('categories',
//   query => query.orderByChild('name')
// ).snapshotChanges()
//   .pipe(map(items => { .
//     return items.map(a => {
//       const data = a.payload.val();
//       const key = a.payload.key;
//       return { key, data };
//     });
//   }));
//   }