import { TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Http, Response, ResponseOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieModule } from 'ngx-cookie';

import { MockUserData, MockAuthService, MockHttp, MockHttpResponse } from '../../../testing';

import { IsLoggedInGuard } from './is-logged-in.guard';
import { AuthService } from '../services/auth.service';

describe('IsLoggedInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CookieModule.forRoot()
      ],
      providers: [
        IsLoggedInGuard,
        MockUserData,
        { provide: AuthService, useClass: MockAuthService },
        { provide: Http, useClas: MockHttp }]
    });
  });

  it('should ...', inject([IsLoggedInGuard], (guard: IsLoggedInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
