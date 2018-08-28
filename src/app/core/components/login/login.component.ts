import { Component } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth: AuthService) { }

  logIn() {
  this.auth.login();
    // console.log('Log me in');
  }

  logOut() {
    this.auth.logOut();
  }
}
