import { Injectable } from '@angular/core';
import {SharedService} from "./shared.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
      private _sharedService: SharedService,
  ) { }

  setUserAnswerQuizzInfo(info): void {
    let self = this;
    var isExistQuizzInfo = false;
    let userAnswerQuizzInfo = this.getUserAnswerQuizzInfo();
    if (userAnswerQuizzInfo) {
      userAnswerQuizzInfo.map(item => {
        if (item.id == info.id) {
          item.questionAnsweredResult = info.questionAnsweredResult;
          isExistQuizzInfo = true;
          return;
        }
      });
      if (!isExistQuizzInfo) {
        userAnswerQuizzInfo.push(info);
      }
      localStorage.removeItem('userAnswerQuizzInfo');
      localStorage.setItem('userAnswerQuizzInfo',JSON.stringify(userAnswerQuizzInfo));
    }
    else
      localStorage.setItem('userAnswerQuizzInfo',JSON.stringify([info]));
  }

  getUserAnswerQuizzInfo() {
    return this._sharedService.convertStringToJson(localStorage.getItem('userAnswerQuizzInfo'));
  }

  removeUserAnswerQuizzInfo() {
    localStorage.removeItem('userAnswerQuizzInfo');
  }
}
