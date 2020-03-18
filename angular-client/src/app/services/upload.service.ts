import { Injectable } from '@angular/core';
import {GlobalConstants} from "../common/global-constants";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private _uploadUrl: string = GlobalConstants.serverURL + '/v1/upload';
  private _uploadAction: string = '/post-upload-file';

  constructor(
      private http: HttpClient,
  ) { }

  uploadFile(data) {
    let uploadURL = this._uploadUrl + this._uploadAction;
    return this.http.post<any>(uploadURL, data);
  }

}
