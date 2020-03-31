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
    this.win = (this.rightAnswers == this.totalQuestions);
  }

  clearData(): void {
    this.dialogRef.close();
    this._questionService.removeAnsweredData();
  }

  onNoClick(): void {
    if (this.win) {
      this.openDialog(GiftComponent);
      this._questionService.removeAnsweredData();
    }
    this.dialogRef.close();
  }

  onGetPrize(): void {
    this.clearData();
    this.openDialog(GiftExchangeComponent);
  }

  onContinuePlay(): void {
    this.clearData();
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
