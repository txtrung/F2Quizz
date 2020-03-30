import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {UserService} from "./services/user.service";
import {User} from "./models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentUser: User;

  constructor(
      private translate: TranslateService,
      private router: Router,
      private authenticationService: UserService

  ) {
    translate.addLangs(['vi']);
    // @ts-ignore
    if (localStorage.getItem('locale')) {
      // @ts-ignore
      const browserLang = localStorage.getItem('locale');
      translate.use(browserLang.match(/vi/) ? browserLang : 'vi');
    } else {
      // @ts-ignore
      localStorage.setItem('locale', 'vi');
      translate.setDefaultLang('vi');
    }
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
}
