import { Injectable } from '@angular/core';
import {SharedService} from "./shared.service";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userApi: string = '/v1/users';
  private _authenticateApi: string = '/v1/users/authenticate';
  private _registerApi: string = '/v1/users/register';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
      private _sharedService: SharedService,
      private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(data) {
    return this.http.post<any>(`${GlobalConstants.serverURL + this._authenticateApi}`, data)
        .pipe(map(data => {
          if (data.status === GlobalConstants.success) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(data.access_token));
            this.currentUserSubject.next(data.access_token);
          }
          // if (data.status === GlobalConstants.error) {
          //
          // }
          return data;
        }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  register(data) {
    return this.http.post(`${GlobalConstants.serverURL + this._registerApi}`, data);
  }

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
