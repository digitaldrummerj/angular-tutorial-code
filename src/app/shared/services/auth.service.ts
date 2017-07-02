import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { User } from '../classes/user';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class AuthService {
  private options = new RequestOptions({ withCredentials: true });
  private url: string = `${environment.apiBaseUrl}/user`;
  private cookieKey: string = "currentUser";

  constructor(private http: Http, private cookieService: CookieService) { }

  public getUser(): User {
    return <User>this.cookieService.getObject(this.cookieKey)
  }

  private setUser(value: User): void {
    this.cookieService.putObject(this.cookieKey, value);
  }

  private clearUser(): void {
    this.cookieService.remove(this.cookieKey);
  }

  login(email: string, password: string): Observable<boolean> {
    let loginInfo = { "email": email, "password": password };
    return this.http.put(`${this.url}/login`, loginInfo, this.options)
      .do((res: Response) => {
        if (res) {
          this.setUser(<User>res.json());
          return Observable.of(true);
        }
        this.clearUser();
        return Observable.of(false);
      })
      .catch(error => {
        console.log('login error', error);
        this.clearUser();
        return Observable.of(false);
      });
  }

  signup(email: string, password: string): Observable<boolean> {
    let loginInfo = { "email": email, "password": password };
    return this.http.post(this.url, loginInfo, this.options)
      .do((res: Response) => {
        if (res) {
          this.setUser(<User>res.json());
          return Observable.of(true);
        }

        this.clearUser();
        return Observable.of(false);
      })
      .catch(error => {
        console.log('signup error', error);
        this.clearUser();
        return Observable.of(false);
      });
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get(`${this.url}/identity`, this.options)
      .map((res: Response) => {
        if (res) {
          this.setUser(<User>res.json());
          return Observable.of(true);
        }

        this.clearUser();
        return Observable.of(false);
      })
      .catch((error: Response) => {
        if (error.status !== 403) {
          console.log('isAuthenticated error', error);
        }
        this.clearUser();
        return Observable.of(false);
      });
  }
}
