import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {map} from "rxjs/operators";
import {User} from "../models/user";
import {BehaviorSubject, Observable} from "rxjs";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class SocialloginService {

  private _userApi: string = '/v1/users';
  private _socialAuthenticateApi: string = '/v1/users/social-authenticate';

  constructor(private http: HttpClient, private authenticationService: UserService) {
  }


  savesResponse(formData)
  {
    return this.http.post<any>(`${GlobalConstants.serverURL + this._socialAuthenticateApi}`,formData).pipe(map(data => {
      if (data.status === GlobalConstants.success) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(data.access_token));
        this.authenticationService.currentUserSubject.next(data.access_token);
      }
      return data;
    }));
  }
}
