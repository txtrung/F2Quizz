import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {SocialloginService} from "../../services/sociallogin.service";

@Component({
  selector: 'app-app-bar-header',
  templateUrl: './app-bar-header.component.html',
  styleUrls: ['./app-bar-header.component.css']
})
export class AppBarHeaderComponent implements OnInit {

  currentUser: User;

  constructor(
      private router: Router,
      private authenticationService: UserService,
      private authenticationSocialService: SocialloginService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.authenticationSocialService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
