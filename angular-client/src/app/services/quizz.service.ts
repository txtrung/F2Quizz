import { Injectable } from '@angular/core';
import { GlobalConstants } from "../common/global-constants";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Quizz} from "../models/quizz";
import {Observable, throwError as _throw } from "rxjs";
import {Question} from "../models/question";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {SharedService} from "./shared.service";

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  private _splash: string = '/';
  private _getQuizzUrl: string = GlobalConstants.serverURL + "/v1/quizzes";
  private _getQuestionByQuizzIdUrl: string = "/question";

  constructor(
      private http: HttpClient,
      private sharedService: SharedService
  ) {}

  getQuizzes(): Observable<Quizz[]> {
    return this.http.get<Quizz[]>(this._getQuizzUrl).pipe(catchError(this.errorHandler));
  }

  getQuestionByQuizzId(quizzId=''): Observable<Question[]> {
    let url = this._getQuizzUrl + this._splash + quizzId + this._getQuestionByQuizzIdUrl;
    return this.http.get<Question[]>(url).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }

  setCurrentQuizzInfo(quizz): void {
    localStorage.setItem('quizz',quizz);
  }
  getCurrentQuizzInfo() {
    return this.sharedService.convertStringToJson(localStorage.getItem('quizz'));
  }

}
