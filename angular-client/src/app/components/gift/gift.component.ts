import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from "../../common/global-constants";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material";
import {DownloadService} from "../../services/download.service";

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
      private _downloadService: DownloadService
  ){
    dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

  download() {
    let self = this;
    this._downloadService.downloadFile().subscribe(response => {
      window.location.href = response.url;
    },error => self.errorMsg = error);
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigateByUrl(GlobalConstants.splash+GlobalConstants.quizzesUrl);
  }

  onContinuePlay(): void {
    this.dialogRef.close();
    this.router.navigateByUrl(GlobalConstants.splash+GlobalConstants.quizzesUrl);
  }

}
