import { Component, OnInit } from '@angular/core';
import {Quizz} from "../../models/quizz";
import {Question} from "../../models/question";
import {Answer} from "../../models/answer";
import {MatDialog} from "@angular/material";
import {ResultsComponent} from "../results/results.component";
import {QuizzService} from "../../services/quizz.service";
import {ActivatedRoute, Router} from "@angular/router";
import {__param} from "tslib";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  private loading: boolean = true;
  private categoryTitle: string;
  private categoryDescription: string;
  private answers = [];
  private questionsOrder: any;

  // @ts-ignore
  private quizz: Quizz = {
    id: 1,
    title: "Đi đố",
    description: "đi để bị đố, đố để bị đi"
  };

  private questions = [];
  private question: Question;

  constructor(
      private _quizzService: QuizzService,
      public dialog: MatDialog,
      private route: ActivatedRoute,
      private router: Router
  ) {
  }

  ngOnInit() {
    // let aaa = this.router.lastSuccessfulNavigation;
    let param = JSON.parse(this.route.snapshot.queryParams.quizz);
    if (param !== undefined && param) {
      this.categoryTitle = param.title;
      this.categoryDescription = param.des;
      this._quizzService.getQuestionByQuizzId(param.id).subscribe(data => {
        this.loading = false;
        this.questions = data;
        if (this.questions.length > 0) {
          this.questionsOrder = 0;
          this.setContentPage(this.questionsOrder);
        }
      });
    }
  }

  /**
   *
   * @param questionsOrder
   */
  setContentPage(questionsOrder): void {
    this.question = this.questions[questionsOrder];
    this.answers = this.question.answers;
  }

  /**
   *
   */
  goPriviousQuestion(): void {
    if (this.questionsOrder !== undefined && this.questionsOrder && this.questionsOrder !== 0) {
      this.questionsOrder -= 1;
      this.setContentPage(this.questionsOrder);
    }
  }

  /**
   *
   */
  goNextQuestion(): void {
    if (this.questionsOrder !== undefined && this.questionsOrder < this.questions.length - 1) {
      this.questionsOrder += 1;
      this.setContentPage(this.questionsOrder);
    }
  }

  animal: string;
  name: string;

  openDialog(): void {
    const dialogRef = this.dialog.open(ResultsComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  /**
   *
   */
  checkAllQuestions(): void {
    this.openDialog();
  }

}
