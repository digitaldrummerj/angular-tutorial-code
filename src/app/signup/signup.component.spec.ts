import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { SpyLocation } from '@angular/common/testing';

import { SignupComponent } from './signup.component';
import { AuthService } from '../shared/services/auth.service';

import { expectPathToBe, advance, MockAuthService, MockUserData, click } from '../../testing';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let element: DebugElement;
  let location: SpyLocation;
  let allLinks: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: SignupComponent },
          { path: '', component: SignupComponent }
        ]),
        FormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        SignupComponent
      ],
      providers: [
        MockUserData,
        { provide: AuthService, useClass: MockAuthService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    element = fixture.debugElement;
    component = element.componentInstance;
    const injector = fixture.debugElement.injector;
    location = injector.get(Location) as SpyLocation;

    fixture.detectChanges();
    allLinks = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have 1 routerLink in template', fakeAsync(() => {
    expect(allLinks.length).toBe(1, 'should have 1 links');
  }));

  it('login link should go to login route', fakeAsync(() => {
    click(allLinks[0]);
    advance(fixture);
    expectPathToBe(location, '/login');
  }));

  it('signup should redirect to home page', fakeAsync(() => {
    // navigate to login page
    location.go('/signup');
    advance(fixture);

    // verify on login route
    expect(location.path()).toEqual('/signup', 'after initial navigation');

    // call login function in component
    component.signup({});
    advance(fixture);

    // validate that user was navigate back to home page
    expect(location.path()).toEqual('/', 'after logging in');
  }));
});
