import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from "../../common/global-constants";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material";
import {HttpClient, HttpEventType } from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UploadService} from "../../services/upload.service";
import {DownloadService} from "../../services/download.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-gift-exchange',
  templateUrl: './gift-exchange.component.html',
  styleUrls: ['./gift-exchange.component.css']
})
export class GiftExchangeComponent implements OnInit {

  form: FormGroup;
  uploadResponse;
  private successUpload = false;
  private message = '';
  private downloadedCount = 0;
  private downloadLinks;
  private loading = false;

  constructor(
      private router: Router,
      public dialogRef: MatDialogRef<GiftExchangeComponent>,
      private http: HttpClient,
      private formBuilder: FormBuilder, private _uploadService: UploadService,
      private _downloadService: DownloadService,
      private _userService: UserService
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      file: ['']
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('file').setValue(file);
    }
  }

  onSubmit() {
    this.loading = true;

    const formData = new FormData();
    formData.append('file', this.form.get('file').value);

    this._uploadService.uploadFile(formData)
        .subscribe(
          (res) => {
            this.uploadResponse = res;
            this.successUpload = true;
            this._downloadService.getDownloadExchangeId().subscribe((response)=>{
              this.loading = false;
              this.downloadLinks = JSON.parse(response._body);
              console.log(response);
            }, (error) => {
              this.loading = false;
              this.uploadResponse = error;
            });
            console.log(res);
          },
          (err) => {
            this.loading = false;
            this.uploadResponse = err;
            console.log(err);
          }
        );
  }

  download(id) {
    let self = this;
    if (this.downloadedCount === 2) {
      return;
    }
    this.downloadedCount++;
    this._downloadService.downloadFile(id).subscribe(response => {
      window.location.href = response.url;
    },error => self.message += error);
  }

  // preview() {
  //   // Show preview
  //   var mimeType = this.fileData.type;
  //   // if (mimeType.match(/image\/*/) == null) {
  //   //   return;
  //   // }
  //
  //   var reader = new FileReader();
  //   reader.readAsDataURL(this.fileData);
  //   reader.onload = (_event) => {
  //     this.previewUrl = reader.result;
  //   }
  // }
  //

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
