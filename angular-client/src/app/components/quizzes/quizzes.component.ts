import { Component, OnInit } from '@angular/core';
import {QuizzService} from "../../services/quizz.service";
import {Router, NavigationExtras} from "@angular/router";
import {stringify} from "querystring";
import {json} from "@angular-devkit/core";
import {GlobalConstants} from "../../common/global-constants";
import {UserAnswerQuizz} from "../../models/userAnswerQuizz";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {

  public quizzes = [];
  public errorMsg;
  private loading = true;
  private userAnswerQuizzInfo = [];
  private nextQuizz;

  constructor(
      private router: Router,
      private _quizzService: QuizzService,
      private _userService: UserService
  ) { }

  ngOnInit() {
    let self = this;
    this.userAnswerQuizzInfo = self._userService.getUserAnswerQuizzInfo();
    this._quizzService.getQuizzes().subscribe(data => {
      self.quizzes = data;
      if (window.history.state.continuePlaying !== undefined && window.history.state.continuePlaying) {
        data.map(item=>{
          if (self.userAnswerQuizzInfo.findIndex(element=>element.id == item.id) === -1) {
            self.nextQuizz = item;
            return;
          } else {
            self.nextQuizz = null;
          }
        });
      }
      self.loading = false;
      if (self.nextQuizz !== undefined && self.nextQuizz) {
        self.goToQuestionsPage(self.nextQuizz);
      } else {

      }
    },error => self.errorMsg = error);
  }

  goToQuestionsPage(quizz): void {
    let quizzString = JSON.stringify(quizz);
    this._userService.setUserAnswerQuizzInfo({
      id: quizz.id,
      questionAnsweredResult: false
    });
    this._quizzService.setCurrentQuizzInfo(quizzString);
    this.router.navigateByUrl('/'+GlobalConstants.questionsUrl, {state: {quizz:quizzString}});
  }

}
