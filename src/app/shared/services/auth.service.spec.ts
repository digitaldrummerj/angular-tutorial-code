import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Http, Response, ResponseOptions } from '@angular/http';
import { CookieModule } from 'ngx-cookie';

import { MockHttp, MockHttpResponse } from '../../../testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CookieModule.forRoot()

      ],
      providers: [
        AuthService,
        { provide: Http, useClas: MockHttp }]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
