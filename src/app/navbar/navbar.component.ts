import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';
import { AdminAuthGuard } from '../services/admin-auth-guard.service';
import { map } from '../../../node_modules/rxjs/operators';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {

  isAdmin$:  Observable <boolean>;
  constructor(public auth: AuthService, private adminGuardService: AdminAuthGuard) {
    // Before using async Pipe
    // afAuth.authState.subscribe(userFromServer => this.user = userFromServer);
    this.isAdmin$ = this.adminGuardService.isUserAdmin();
    this.isAdmin$.subscribe(x => console.log('asdasdasd', x));
  }

  logOut() {
    this.auth.logOut();
  }
}
