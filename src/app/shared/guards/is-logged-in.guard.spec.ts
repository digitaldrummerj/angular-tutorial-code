import { TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Http, Response, ResponseOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';


import { IsLoggedInGuard } from './is-logged-in.guard';
import { AuthService } from '../services/auth.service';

function createResponse(body) {
  return Observable.of(
    new Response(new ResponseOptions({ body: JSON.stringify(body) }))
  );
}

class MockHttp {
  get() {
    return createResponse([]);
  }
}

describe('IsLoggedInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        IsLoggedInGuard,
        AuthService,
        { provide: Http, useClas: MockHttp }]
    });
  });

  it('should ...', inject([IsLoggedInGuard], (guard: IsLoggedInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
