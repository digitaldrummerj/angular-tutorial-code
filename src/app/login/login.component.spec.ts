import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { SpyLocation } from '@angular/common/testing';
import { Location } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthService } from '../shared/services/auth.service';
import { expectPathToBe, advance, MockAuthService, click } from '../../testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let element: DebugElement;
  let location: SpyLocation;
  let allLinks: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
          { path: 'signup', component: LoginComponent },
          { path: '', component: LoginComponent }
        ]),
        FormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA],

      declarations: [
        LoginComponent
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    element = fixture.debugElement;
    component = element.componentInstance;
    const injector = fixture.debugElement.injector;
    location = injector.get(Location) as SpyLocation;

    allLinks = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have 1 routerLink in template', fakeAsync(() => {
    expect(allLinks.length).toBe(1, 'should have 1 link');
  }));

  it('signup link should go to signup route', fakeAsync(() => {
    click(allLinks[0]);
    advance(fixture);
    expectPathToBe(location, '/signup');
  }));

  it('login should redirect to home page', fakeAsync(() => {
    // navigate to login page
    location.go('/login');
    advance(fixture);

    // verify on login route
    expect(location.path()).toEqual('/login', 'after initial navigation');

    // call login function in component
    component.login({});
    advance(fixture);

    // validate that user was navigate back to home page
    expect(location.path()).toEqual('/', 'after logging in');
  }));
});

