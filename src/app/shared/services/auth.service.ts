import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const requestOptions = {
  withCredentials: true,
};

@Injectable()
export class AuthService {
  private url = `${environment.apiBaseUrl}/user`;
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean | Response> {
    console.log('auth.service login');

    const loginInfo = { email, password };

    return this.http.put(`${this.url}/login`, loginInfo, requestOptions).pipe(
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
    const loginInfo = { email, password };
    return this.http.post('https://sails-ws.herokuapp.com/user/', loginInfo, requestOptions).pipe(
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

  isAuthenticated(): Observable<boolean | Response> {
    return this.http.get('https://sails-ws.herokuapp.com/user/identity', requestOptions).pipe(
      tap((res: Response) => {
        if (res) {
          console.log('logged in');
          return of(true);
        }

        console.log('not logged in');
        return of(false);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 403) {
          console.log('isAuthenticated error', error);
        }
        console.log('not logged in', error);
        return of(false);
      })
    );
  }

  logout(): Observable<boolean | Response> {
    return this.http.get('https://sails-ws.herokuapp.com/user/logout', requestOptions).pipe(
      tap((res: Response) => {
        if (res.ok) {
          return of(true);
        }

        return of(false);
      }),
      catchError((error: HttpErrorResponse) => {
        return of(false);
      })
    );
  }
}
