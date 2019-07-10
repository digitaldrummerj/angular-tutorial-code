import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../classes/user';
import { CookieService } from 'ngx-cookie';
import { Output, EventEmitter } from '@angular/core';

const requestOptions = {
  withCredentials: true,
};

@Injectable()
export class AuthService {
  private url = `${environment.apiBaseUrl}/user`;
  private cookieKey = 'currentUser';
  @Output() getLoggedInUser: EventEmitter<User> = new EventEmitter<User>();

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getUser(): User {
    return this.cookieService.getObject(this.cookieKey) as User;
  }

  private setUser(value: User): void {
    this.cookieService.putObject(this.cookieKey, value);
    this.getLoggedInUser.emit(value);
  }

  private clearUser(): void {
    this.cookieService.remove(this.cookieKey);
    this.getLoggedInUser.emit(null);
  }

  login(email: string, password: string): Observable<boolean | User> {
    console.log('auth.service login');

    const loginInfo = { email, password };

    return this.http.put<User>(`${this.url}/login`, loginInfo, requestOptions).pipe(
      tap((user: User) => {
        if (user) {
          console.log('logged in');
          this.setUser(user);
          return of(true);
        }

        console.log('not logged in');
        this.clearUser();
        return of(false);
      }),
      catchError(error => {
        console.log('login error', error);
        this.clearUser();
        return of(false);
      })
    );
  }

  signup(email: string, password: string): Observable<boolean | User> {
    const loginInfo = { email, password };
    return this.http.post<User>('https://sails-ws.herokuapp.com/user/', loginInfo, requestOptions).pipe(
      tap((user: User) => {
        if (user) {
          this.setUser(user);
          return of(true);
        }

        this.clearUser();
        return of(false);
      }),
      catchError(error => {
        console.log('signup error', error);
        this.clearUser();
        return of(false);
      })
    );
  }

  isAuthenticated(): Observable<boolean | User> {
    return this.http.get<User>('https://sails-ws.herokuapp.com/user/identity', requestOptions).pipe(
      tap((user: User) => {
        if (user) {
          console.log('logged in');
          this.setUser(user);
          return of(true);
        }

        console.log('not logged in');
        this.clearUser();
        return of(false);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 403) {
          console.log('isAuthenticated error', error);
        }
        console.log('not logged in', error);
        this.clearUser();
        return of(false);
      })
    );
  }

  logout(): Observable<boolean | Response> {
    return this.http.get('https://sails-ws.herokuapp.com/user/logout', requestOptions).pipe(
      tap((res: Response) => {
        this.clearUser();
        if (res.ok) {
          return of(true);
        }

        return of(false);
      }),
      catchError((error: HttpErrorResponse) => {
        this.clearUser();
        return of(false);
      })
    );
  }
}
