import { AppUser } from './../models/app-user';
import { Injectable } from '@angular/core';
import { CanActivate } from '../../../node_modules/@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Observable } from '../../../node_modules/rxjs';
import { AngularFireObject } from '../../../node_modules/angularfire2/database';
import { map, switchMap } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  userFromDB: AngularFireObject<AppUser>;
  isAdmin: boolean;
  myUser: Observable<AppUser>;

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.user$
            .pipe(
                map((user: firebase.User) => {
                    this.userFromDB = this.userService.get(user.uid);
                    this.userFromDB.valueChanges().subscribe(myUser => {
                      console.log(myUser);
                      console.log(myUser.name);
                      console.log(myUser.isAdmin);
                      console.log(myUser.email);
                      this.isAdmin = myUser.isAdmin;
                      return this.isAdmin;
                    });
                    console.log('MyUser admin---->', this.isAdmin);
                    return this.isAdmin;
                }));
  }

  isUserAdmin(): Observable<boolean>{
    const isMyUserAdmin = this.canActivate();
    const user = isMyUserAdmin.pipe(map(x => x));
    return user;
  }
}
