import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../models/user";

@Component({
  selector: 'app-app-bar-header',
  templateUrl: './app-bar-header.component.html',
  styleUrls: ['./app-bar-header.component.css']
})
export class AppBarHeaderComponent implements OnInit {

  currentUser: User;

  constructor(
      private router: Router,
      private authenticationService: UserService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
