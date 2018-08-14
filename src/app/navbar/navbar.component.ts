import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';
import { AdminAuthGuard } from '../services/admin-auth-guard.service';
import { map } from '../../../node_modules/rxjs/operators';
import { Observable } from '../../../node_modules/rxjs';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  isAdmin$:  Observable <boolean>;
  cart$: Observable<ShoppingCart>;
  constructor(
    public auth: AuthService, 
    private adminGuardService: AdminAuthGuard,
    private cartService: ShoppingCartService) {
    // Before using async Pipe
    // afAuth.authState.subscribe(userFromServer => this.user = userFromServer);
    
    
  }

  async ngOnInit(){
    this.isAdmin$ = this.adminGuardService.isUserAdmin();
    this.cart$ = await this.cartService.getCart();
   
  }

  logOut() {
    this.auth.logOut();
  }
}
