import { Component, OnInit } from '@angular/core';
import {QuizzService} from "../../services/quizz.service";
import {Router, NavigationExtras} from "@angular/router";
import {stringify} from "querystring";
import {json} from "@angular-devkit/core";
import {GlobalConstants} from "../../common/global-constants";

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {

  public quizzes = [];
  public errorMsg;
  private loading = true;

  constructor(
      private router: Router,
      private _quizzService: QuizzService,
  ) { }

  ngOnInit() {
    this._quizzService.getQuizzes().subscribe(data => {
      this.quizzes = data;
      this.loading = false;
    },error => this.errorMsg = error);
  }

  goToQuestionsPage(quizz): void {
    let quizzString = JSON.stringify(quizz);
    this._quizzService.setCurrentQuizzInfo(quizzString);
    this.router.navigateByUrl('/'+GlobalConstants.questionsUrl, {state: {quizz:quizzString}});
  }

}
