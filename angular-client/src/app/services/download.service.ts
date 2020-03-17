import { Injectable } from '@angular/core';
import {GlobalConstants} from "../common/global-constants";
import {HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {ResponseContentType, Http} from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  private _getDownloadFileUrl: string = GlobalConstants.serverURL + '/v1/download-file/random-reward';

  constructor(
      private http: Http,
      private httpClient: HttpClient
  ) { }

  getFile(): Observable<any>  {
    return this.httpClient.get<any>(this._getDownloadFileUrl).pipe(catchError(this.errorHandler));
  }

  downloadFile(): Observable<any>{
    return this.http.get(this._getDownloadFileUrl).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
}
