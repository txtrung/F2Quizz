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
    return this.sharedService.convertStringToJson(localStorage.getItem('answer'))[0];
  }
}
