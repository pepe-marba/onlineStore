import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from '../../../node_modules/rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private afAuth: AngularFireAuth) { }

  logIn() {
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    // console.log('Log me in');
  }

  logOut() {
    this.afAuth.auth.signOut();
  }
}
