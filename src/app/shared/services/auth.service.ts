import { UserService } from 'shared/services/user.service';
import { AppUser } from 'shared/models/app-user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from '../../../../node_modules/rxjs';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { map, switchMap } from '../../../../node_modules/rxjs/operators';
import { AngularFireObject } from '../../../../node_modules/angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;
  userFromDB: AngularFireObject<AppUser>;
  userObs: AppUser;
  constructor(
    private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) {
    this.user$ = afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logOut() {

    this.afAuth.auth.signOut();
  }

  // get appUser$(): Observable<AppUser> {
  //   return this.user$.pipe(
  //     map((user: firebase.User) => {
  //       this.userFromDB = this.userService.get(user.uid);
  //       this.userFromDB.valueChanges().subscribe(myUser => {
  //         this.userObs = myUser;
  //         return myUser;
  //       });
  //       return this.userObs;
  //     }));
  // }
}
