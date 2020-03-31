import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from "../../common/global-constants";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material";
import {DownloadService} from "../../services/download.service";
import {UserService} from "../../services/user.service";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent implements OnInit {

  public errorMsg;

  constructor(
      private router: Router,
      public dialogRef: MatDialogRef<GiftComponent>,
      private _downloadService: DownloadService,
      private _userService: UserService,
      private alertService: AlertService
  ){
    dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

  download() {
    let self = this;
    this._downloadService.downloadFile().subscribe(response => {
      window.location.href = response.url;
      self.errorMsg = '';
    },error => {
      this.alertService.error(error);
      // this.loading = false;
      // self.errorMsg = error
    });
  }

  clearData(): void {
    this.dialogRef.close();
    this._userService.removeUserAnswerQuizzInfo();
  }

  onNoClick(): void {
    this.clearData();
    this.router.navigateByUrl(GlobalConstants.splash+GlobalConstants.quizzesUrl);
  }

  onContinuePlay(): void {
    this.clearData();
    this.router.navigateByUrl(GlobalConstants.splash+GlobalConstants.quizzesUrl);
  }

}
