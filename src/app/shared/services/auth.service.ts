import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
 import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  private options = new RequestOptions({ withCredentials: true });
   private url: string = `${environment.apiBaseUrl}/user`;
  constructor(private http: Http) {
  }

  login(email: string, password: string): Observable<boolean> {
    let loginInfo = { "email": email, "password": password };
    return this.http.put(`${this.url}/login`, loginInfo, this.options)
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
    return this.http.post(this.url, loginInfo, this.options)
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
    return this.http.get(`${ this.url }/identity`, this.options)
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
