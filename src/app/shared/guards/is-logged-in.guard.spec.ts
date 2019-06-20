import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieModule } from 'ngx-cookie';

import { MockAuthService } from '../../../testing';

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
        { provide: AuthService, useClass: MockAuthService },
      ]
    });
  });

  it('should ...', inject([IsLoggedInGuard], (guard: IsLoggedInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
