import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router} from "@angular/router";
import {GlobalConstants} from "../../common/global-constants";
import {UserService} from "../../services/user.service";
import {QuestionService} from "../../services/question.service";

export interface DialogData {
  [x: string]: number;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  private rightAnswers = 0;
  private totalQuestions = 0;
  private quizzId;
  private win = false;

  constructor(
    public dialogRef: MatDialogRef<ResultsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
    private _userService: UserService,
    private _questionService: QuestionService
  ) {
  }

  ngOnInit() {
    this.rightAnswers = this.data.rightAnswers;
    this.totalQuestions = this.data.totalQuestions;
    this.quizzId = this.data.quizzId;
    this.win =  this.rightAnswers == this.totalQuestions;
  }

  onNoClick(): void {
    this.dialogRef.close();
    this._questionService.removeAnsweredData();
    this.router.navigateByUrl('/'+GlobalConstants.quizzesUrl);
  }

  onGetPrize(): void {

  }

  onContinuePlay(): void {
    this.dialogRef.close();
    this._questionService.removeAnsweredData();
    this._userService.setUserAnswerQuizzInfo({
      id: this.quizzId,
      questionAnsweredResult: this.win
    });
    this.router.navigateByUrl('/'+GlobalConstants.quizzesUrl, {state: {continuePlaying: true}});
  }
}
