import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';


  ngOnInit(): void {
    // AppGlobals.GOOGLE_CLIENT_ID = environment.googleAppConfig.client_id;
  }

}

// Client ID
// 141505788232-dad281dt89f3tivvft1juhi4apvqpcjq.apps.googleusercontent.com
