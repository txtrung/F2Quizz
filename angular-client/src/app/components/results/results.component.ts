import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router} from "@angular/router";
import {GlobalConstants} from "../../common/global-constants";
import {UserService} from "../../services/user.service";
import {QuestionService} from "../../services/question.service";
import {GiftComponent} from "../gift/gift.component";
import {GiftExchangeComponent} from "../gift-exchange/gift-exchange.component";

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
    private _questionService: QuestionService,
    public dialog: MatDialog,
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.rightAnswers = this.data.rightAnswers;
    this.totalQuestions = this.data.totalQuestions;
    this.quizzId = this.data.quizzId;
    this.win =  this.checkIsWinner() || (this.rightAnswers == this.totalQuestions);
    this._userService.setUserAnswerQuizzInfo({
      id: this.quizzId,
      questionAnsweredResult: this.win
    });
  }

  checkIsWinner(): boolean {
    let check = false;
    this._userService.getUserAnswerQuizzInfo().map(value=>{
      if (value.questionAnsweredResult) {
        check = true;
        return;
      }
    });
    return check;
  }

  onNoClick(): void {
    this.dialogRef.close();
    this._questionService.removeAnsweredData();
    if (!this.checkIsWinner())
      this.router.navigateByUrl(GlobalConstants.splash+GlobalConstants.quizzesUrl);
    else
      this.openDialog(GiftComponent);
  }

  onGetPrize(): void {
    this.dialogRef.close();
    this._questionService.removeAnsweredData();
    this.openDialog(GiftExchangeComponent);
  }

  onContinuePlay(): void {
    this.dialogRef.close();
    this._questionService.removeAnsweredData();
    this.router.navigateByUrl(GlobalConstants.splash+GlobalConstants.quizzesUrl, {state: {continuePlaying: true}});
  }

  openDialog(component): void {
    const dialogRef = this.dialog.open(component, {
      width: 'auto',
      data: {
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
