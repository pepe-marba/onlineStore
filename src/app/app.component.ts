import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { Router } from '../../node_modules/@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private auth: AuthService, router: Router){
    auth.user$.subscribe(user => {
      if (user){
        const returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    });
  }

}

