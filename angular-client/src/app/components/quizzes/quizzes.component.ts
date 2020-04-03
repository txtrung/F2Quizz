import { Component, OnInit } from '@angular/core';
import {QuizzService} from "../../services/quizz.service";
import {Router, NavigationExtras} from "@angular/router";
import {stringify} from "querystring";
import {json} from "@angular-devkit/core";
import {GlobalConstants} from "../../common/global-constants";
import {UserAnswerQuizz} from "../../models/userAnswerQuizz";
import {UserService} from "../../services/user.service";
import {LoadingComponent} from "../share/loading/loading.component";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {

  public quizzes = [];
  public loading = true;

  constructor(
      private router: Router,
      private _quizzService: QuizzService,
      private _userService: UserService,
      private alertService: AlertService
  ) { }

  ngOnInit() {
    let self = this;
    this._quizzService.getQuizzes().subscribe(data => {
      self.quizzes = data;
      self.loading = false;
    },error => {
      this.alertService.error(GlobalConstants.serverError);
      self.loading = false;
      // self.errorMsg = error
    });
  }

  goToQuestionsPage(quizz): void {
    let quizzString = JSON.stringify(quizz);
    this._quizzService.setCurrentQuizzInfo(quizzString);
    this.router.navigateByUrl('/'+GlobalConstants.questionsUrl, {state: {quizz:quizzString}});
  }

}
