import { Injectable } from '@angular/core';
import { MockUserData, User } from '../data/mock.user.data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class MockAuthService {
  constructor(private userMockData: MockUserData) { }

  public getUser(): User {
    return this.userMockData.ExistingUser1;
  }

  private setUser(value: User): void {
  }

  private clearUser(): void {
  }


  login(email: string, password: string): Observable<boolean> {
    return Observable.of(true);

  }

  signup(email: string, password: string): Observable<boolean> {
    return Observable.of(true);

  }

  isAuthenticated(): Observable<boolean> {
    return Observable.of(true);
  }

  logout(): Observable<boolean> {
    return Observable.of(true);
  }

}