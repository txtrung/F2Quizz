import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  convertStringToJson(jsonString) {
    if (jsonString) {
      while (typeof jsonString === 'string') {
        jsonString = JSON.parse(jsonString);
      }
    }
    return jsonString;
  }
}
