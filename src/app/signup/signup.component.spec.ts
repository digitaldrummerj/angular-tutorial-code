import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { SignupComponent } from './signup.component';
import { AuthService } from '../shared/services/auth.service';

class MockAuthService {

  login(email: string, password: string): Observable<boolean> {
    return Observable.of(true);
  }

  signup(email: string, password: string): Observable<boolean> {
    return Observable.of(true);
  }

  isAuthenticated(): Observable<boolean> {
    return Observable.of(true);
  }
}
describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SignupComponent],
      providers: [{ provide: AuthService, useClass: MockAuthService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
