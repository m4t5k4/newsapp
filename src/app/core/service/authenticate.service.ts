import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../data/schema/user.model';
import { UserLogin } from '../../data/schema/user-login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private _httpClient: HttpClient) { }

  authenticate (userLogin: UserLogin): Observable<User> {
    return this._httpClient.post<User>("https://localhost:5001/api/User/authenticate", userLogin);
  }

}