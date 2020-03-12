import { Injectable } from '@angular/core';
import { GlobalConstants } from "../common/global-constants";
import {HttpClient} from "@angular/common/http";
import {Quizz} from "../models/quizz";
import {Observable} from "rxjs";
import {Question} from "../models/question";

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  private _quizzId: string = '';
  private _getQuizzUrl: string = GlobalConstants.serverURL + "/v1/quizzes";
  private _getQuestionByQuizzIdUrl: string = "/question";

  constructor(
      private http: HttpClient
  ) {}

  getQuizzes(): Observable<Quizz[]> {
    return this.http.get<Quizz[]>(this._getQuizzUrl);
  }

  getQuestionByQuizzId(quizzId=''): Observable<Question[]> {
    let url = this._getQuizzUrl + '/' + quizzId + this._getQuestionByQuizzIdUrl;
    return this.http.get<Question[]>(url);
  }
}
