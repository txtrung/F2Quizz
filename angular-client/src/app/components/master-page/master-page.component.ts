import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GlobalConstants} from "../../common/global-constants";
import {User} from "../../models/user";
import { UserService} from "../../services/user.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css']
})
export class MasterPageComponent implements OnInit {

  public quizzesPage: boolean = false;
  public questionsPage: boolean = false;
  currentUser: User;
  users = [];

  constructor(
      private route: ActivatedRoute,
      private authenticationService: UserService,
      private userService: UserService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    if (this.route.snapshot.url[0].path === GlobalConstants.quizzesUrl) {
      this.setLocationValue(true,false);
    }
    if (this.route.snapshot.url[0].path === GlobalConstants.questionsUrl) {
      this.setLocationValue(false,true);
    }
  }

  setLocationValue(quizz,questions): void {
    GlobalConstants.quizzesPage = quizz;
    GlobalConstants.questionsPage = questions;
    this.quizzesPage = quizz;
    this.questionsPage = questions;
  }

}
