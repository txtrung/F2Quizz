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
  private _getDownloadFileExchangeUrl: string = GlobalConstants.serverURL + '/v1/download-file/random-exchange';
  private _getDownloadFileByIdUrl: string = GlobalConstants.serverURL + '/v1/download-file/';

  constructor(
      private http: Http,
      private httpClient: HttpClient
  ) { }

  getFile(): Observable<any>  {
    return this.httpClient.get<any>(this._getDownloadFileUrl);
  }

  downloadFile(id=null): Observable<any>{
    if (id) {
      return this.http.get(this._getDownloadFileByIdUrl+id+'/file');
    } else {
      return this.http.get(this._getDownloadFileUrl);
    }
  }

  getDownloadExchangeId(): Observable<any>{
    return this.http.get(this._getDownloadFileExchangeUrl);
  }

}
