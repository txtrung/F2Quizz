import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Question} from "../../models/question";
import {MatDialog} from "@angular/material";
import {ResultsComponent} from "../results/results.component";
import {QuizzService} from "../../services/quizz.service";
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionService} from "../../services/question.service";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  public errorMsg;
  private loading: boolean = true;
  private categoryTitle: string;
  private categoryDescription: string;
  private answers = [];
  private questionsOrder: any;
  private questions = [];
  private question: Question;
  private quizz;
  private answeredQuestion: any;
  private checkedAnswer = [];
  private checkedResult = 0;

  constructor(
      private _quizzService: QuizzService,
      private _questionService: QuestionService,
      public dialog: MatDialog,
      private route: ActivatedRoute,
      private router: Router,
      private _cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.quizz = window.history.state.quizz !== undefined ? JSON.parse(window.history.state.quizz) : this._quizzService.getCurrentQuizzInfo();
    if (this.quizz !== undefined && this.quizz) {
      this.categoryTitle = this.quizz.title;
      this.categoryDescription = this.quizz.des;
      this._quizzService.getQuestionByQuizzId(this.quizz.id).subscribe(data => {
        this.loading = false;
        this.answeredQuestion = this._questionService.getAnsweredData();
        this.questions = data;
        if (this.questions.length > 0) {
          this.questionsOrder = 0;
          this.setContentPage(this.questionsOrder);
        }
      }, error => this.errorMsg = error);
    }
  }

  ngAfterViewChecked() {
    let listRadioButton = document.getElementsByClassName("answer-radio-button");
    if (listRadioButton.length > 0) {
      for (let i = 0 ; i < listRadioButton.length ; i++) {
        for (let j = 0 ; j < listRadioButton[i].attributes.length ; j++) {
          if (listRadioButton[i].attributes[j].name === "ng-reflect-checked") {
            if (listRadioButton[i].attributes[j].value == "true") {
              listRadioButton[i].className += ' mat-radio-checked';
            }
          }
        }
      }
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

  checkedInput(answer): boolean {
    return this.answeredQuestion && this.answeredQuestion[this.question.id] !== undefined && this.answeredQuestion[this.question.id].answerId == answer.id && this.answeredQuestion[this.question.id].answerTag == answer.tag;

  }

  /**
   *
   */
  onItemChange(target): void {
    if (!this.answeredQuestion) this.answeredQuestion = {};
    this.answeredQuestion[this.question.id] = {
      questionId: this.question.id,
      answerId: target.value ? target.value.id : '',
      answerTag: target.value ? target.value.tag : ''
    };

    this._questionService.setAnsweredData(this.answeredQuestion);
  }

  openDialog(rightAnswers,totalQuestions,quizzId): void {
    const dialogRef = this.dialog.open(ResultsComponent, {
      width: 'auto',
      data: {
        rightAnswers: rightAnswers,
        totalQuestions: totalQuestions,
        quizzId: quizzId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  /**
   *
   */
  checkAllQuestions(): void {
    let self = this;
    let rightAnswer = 0;
    let answeredStore = this._questionService.getAnsweredData();
    if (answeredStore) {
      self.questions.map( item =>{
        if (answeredStore[item.id] !== undefined && answeredStore[item.id].answerTag == item.correct_answer[0].right_answer) {
          rightAnswer++;
        } else {
          // if (rightAnswer > 0) {
          //   rightAnswer--;
          // }
        }
      });
    }
    this.openDialog(rightAnswer,self.questions.length,this.quizz.id);
  }

}
