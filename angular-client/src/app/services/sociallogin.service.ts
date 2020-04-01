import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {map} from "rxjs/operators";
import {User} from "../models/user";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocialloginService {

  private _userApi: string = '/v1/users';
  private _socialAuthenticateApi: string = '/v1/users/social-authenticate';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  savesResponse(formData)
  {
    return this.http.post<any>(`${GlobalConstants.serverURL + this._socialAuthenticateApi}`,formData).pipe(map(data => {
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
}
