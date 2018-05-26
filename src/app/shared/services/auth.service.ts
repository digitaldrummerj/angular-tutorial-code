import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../classes/user';
import { CookieService } from 'ngx-cookie';

const requestOptions = {
  withCredentials: true,
};

@Injectable()
export class AuthService {
  private url = `${environment.apiBaseUrl}/user`;
  private cookieKey = 'currentUser';
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  public getUser(): User {
    return <User>this.cookieService.getObject(this.cookieKey);
  }

  private setUser(value: User): void {
    this.cookieService.putObject(this.cookieKey, value);
  }

  private clearUser(): void {
    this.cookieService.remove(this.cookieKey);
  }

  login(email: string, password: string): Observable<boolean | User> {
    console.log('auth.service login');

    const loginInfo = { email: email, password: password };

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
    const loginInfo = { email: email, password: password };
    return this.http.post<User>(this.url, loginInfo, requestOptions).pipe(
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
    return this.http.get<User>(`${this.url}/identity`, requestOptions).pipe(
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
    return this.http.get(`${this.url}/logout`, requestOptions).pipe(
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
