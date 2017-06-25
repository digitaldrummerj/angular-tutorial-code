import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { User } from '../classes/user';

@Injectable()
export class AuthService {
  public currentUser: User;
  private options = new RequestOptions({ withCredentials: true });

  constructor(private http: Http) {
  }

  login(email: string, password: string): Observable<boolean | Response> {
    let loginInfo = { "email": email, "password": password };
    return this.http.put("https://dj-sails-todo.azurewebsites.net/user/login", loginInfo, this.options)
      .do((res: Response) => {
        if (res) {
          this.currentUser = <User>res.json();
        }
      })
      .catch(error => {
        console.log('login error', error)
        return Observable.of(false);
      });
  }

  signup(email: string, password: string) {
    let loginInfo = { "email": email, "password": password };
    return this.http.post("https://dj-sails-todo.azurewebsites.net/user/", loginInfo, this.options)
      .do((res: Response) => {
        if (res) {
          this.currentUser = <User>res.json();
        }
      })
      .catch(error => {
        console.log('signup error', error)
        return Observable.of(false);
      });
  }
}
