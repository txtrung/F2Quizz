import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GlobalConstants} from "../../common/global-constants";

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css']
})
export class MasterPageComponent implements OnInit {

  private quizzesPage: boolean = false;
  private questionsPage: boolean = false;

  constructor(
      private route: ActivatedRoute
  ) { }

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
