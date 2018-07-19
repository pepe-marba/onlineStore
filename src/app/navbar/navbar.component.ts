import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {

  constructor(public auth: AuthService) {
    // Before using async Pipe
    // afAuth.authState.subscribe(userFromServer => this.user = userFromServer);
  }

  logOut() {
    this.auth.logOut();
  }
}
