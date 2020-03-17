import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from "../../common/global-constants";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material";
import {HttpClient, HttpEventType } from "@angular/common/http";

@Component({
  selector: 'app-gift-exchange',
  templateUrl: './gift-exchange.component.html',
  styleUrls: ['./gift-exchange.component.css']
})
export class GiftExchangeComponent implements OnInit {

  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  constructor(
      private router: Router,
      public dialogRef: MatDialogRef<GiftExchangeComponent>,
      private http: HttpClient
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    // if (mimeType.match(/image\/*/) == null) {
    //   return;
    // }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('files', this.fileData);

    this.fileUploadProgress = '0%';
    this.http.get('http://localhost/f2quizz/yii-application/api/index.php/v1/upload/upload-file').subscribe(data=>{
      console.log(data);
    });
    this.http.post('http://localhost/f2quizz/yii-application/api/index.php/v1/upload/post-upload-file', formData)
        .subscribe(events => {
          // if(events.type === HttpEventType.UploadProgress) {
          //   this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
          //   console.log(this.fileUploadProgress);
          // } else if(events.type === HttpEventType.Response) {
          //   this.fileUploadProgress = '';
          //   console.log(events.body);
          //   alert('SUCCESS !!');
          // }

        })
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
