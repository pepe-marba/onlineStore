import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { AdminAuthGuard } from 'shared/services/admin-auth-guard.service';
import { map } from '../../../node_modules/rxjs/operators';
import { Observable } from '../../../node_modules/rxjs';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

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
