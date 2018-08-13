import { Injectable } from '@angular/core';
import { AngularFireDatabase, listChanges } from '../../../node_modules/angularfire2/database';
import { map } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll(){
    return this.db.list('categories',
      query => query.orderByChild('name')
            ).snapshotChanges()
            .pipe(map(items => {
              return items.map(a => {
                const data = a.payload.val();
                const key = a.payload.key;
                return {key, data};
              });
            }));
  }
}
