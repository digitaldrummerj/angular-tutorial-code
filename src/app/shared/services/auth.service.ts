import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

const requestOptions = {
  withCredentials: true,
};

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean | Response> {
    console.log('auth.service login');

    const loginInfo = { email: email, password: password };

    return this.http
      .put('https://dj-sails-todo.azurewebsites.net/user/login', loginInfo, requestOptions)
      .pipe(
        tap((res: Response) => {
          if (res) {
            console.log('logged in');
            return of(true);
          }

          console.log('not logged in');
          return of(false);
        }),
        catchError(error => {
          console.log('login error', error);
          return of(false);
        })
      );
  }

  signup(email: string, password: string): Observable<boolean | Response> {
    const loginInfo = { email: email, password: password };
    return this.http
      .post('https://dj-sails-todo.azurewebsites.net/user/', loginInfo, requestOptions)
      .pipe(
        tap((res: Response) => {
          if (res) {
            return of(true);
          }

          return of(false);
        }),
        catchError(error => {
          console.log('signup error', error);
          return of(false);
        })
      );
  }
}
