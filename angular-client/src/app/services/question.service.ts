import { Injectable } from '@angular/core';
import {SharedService} from "./shared.service";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
      private sharedService: SharedService
  ) {

  }

  setAnsweredData(data): void {
    localStorage.setItem('answer',JSON.stringify([data]));
  }
  getAnsweredData(): any {
    if (localStorage.getItem('answer')) {
      return this.sharedService.convertStringToJson(localStorage.getItem('answer'))[0];
    }
    return null;
  }
  removeAnsweredData(): void {
    localStorage.removeItem('answer');
  }
}
