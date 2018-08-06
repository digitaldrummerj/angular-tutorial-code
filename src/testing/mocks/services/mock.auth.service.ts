import { Output, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { MockUserData, User } from '../data/mock.user.data';
import { Observable, of } from 'rxjs';

const mockUserData: MockUserData = new MockUserData();

@Injectable()
export class MockAuthService {
  @Output() getLoggedInUser: EventEmitter<User> = new EventEmitter<User>();

  constructor() { }

  public getUser(): User {
    return mockUserData.ExistingUser1;
  }

  private setUser(value: User): void {
  }

  private clearUser(): void {
  }


  login(email: string, password: string): Observable<boolean> {
    return of(true);

  }

  signup(email: string, password: string): Observable<boolean> {
    return of(true);

  }

  isAuthenticated(): Observable<boolean> {
    return of(true);
  }

  logout(): Observable<boolean> {
    return of(true);
  }

}
