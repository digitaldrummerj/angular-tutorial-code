import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  private options = new RequestOptions({ withCredentials: true });

  constructor(private http: Http) {
  }

  login(email: string, password: string): Observable<boolean> {
    let loginInfo = { "email": email, "password": password };
    return this.http.put("https://dj-sails-todo.azurewebsites.net/user/login", loginInfo, this.options)
      .do((res: Response) => {
        if (res) {
          return Observable.of(true);
        }

        return Observable.of(false);
      })
      .catch(error => {
        console.log('login error', error);
        return Observable.of(false);
      });
  }

  signup(email: string, password: string): Observable<boolean> {
    let loginInfo = { "email": email, "password": password };
    return this.http.post("https://dj-sails-todo.azurewebsites.net/user/", loginInfo, this.options)
      .do((res: Response) => {
        if (res) {
          return Observable.of(true);
        }

        return Observable.of(false);
      })
      .catch(error => {
        console.log('signup error', error);
        return Observable.of(false);
      });
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get("https://dj-sails-todo.azurewebsites.net/user/identity", this.options)
      .map((res: Response) => {
        if (res) {
          return Observable.of(true);
        }

        return Observable.of(false);
      })
      .catch((error: Response) => {
        if (error.status !== 403) {
          console.log('isAuthenticated error', error);
        }

        return Observable.of(false);
      });
  }
}
