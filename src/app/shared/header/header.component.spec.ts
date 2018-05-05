import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SpyLocation } from '@angular/common/testing';
import { Location } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';


import { MockAuthService, advance, expectPathToBe, click } from '../../../testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieModule } from 'ngx-cookie';

import { HeaderComponent } from './header.component';
import { AuthService } from '../services/auth.service';

let component: HeaderComponent;
let fixture: ComponentFixture<HeaderComponent>;
let element: DebugElement;
let location: SpyLocation;

describe('HeaderComponent', () => {
  setup();


  describe('Create Test', createTest);
  describe('Navigation Test', navigationTests);
  describe('Toggle Menu Test', toggleMenuTest);
});

function setup() {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: HeaderComponent },
          { path: 'login', children: [], component: HeaderComponent },
          { path: 'signup', component: HeaderComponent },
          { path: '**', component: HeaderComponent }

        ]),
        NgbModule.forRoot(),
        CookieModule.forRoot()
      ],
      declarations: [
        HeaderComponent,
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
      ],
      schemas: [NO_ERRORS_SCHEMA],  // this ensures it doesnt error on routerLink usage
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    element = fixture.debugElement;
    component = element.componentInstance;
    const injector = fixture.debugElement.injector;
    location = injector.get(Location) as SpyLocation;

    // change detection triggers ngOnInit
    fixture.detectChanges();
  });
}

function createTest() {
  it('should be created', () => {
    expect(component).toBeTruthy();
  });
}

function navigationTests() {
  let allLinkDes: DebugElement[];

  beforeEach(() => {
    allLinkDes = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
  });

  it('should have 5 routerLinks for menu items in template', () => {
    expect(allLinkDes.length).toBe(5, 'should have 5 links');
  });

  it('logo takes me home', fakeAsync(() => {
    const linkDes = allLinkDes[0];
    expectPathToBe(location, '', 'link should not have navigated yet');

    click(linkDes);
    advance(fixture);

    expectPathToBe(location, '/');
  }));

  it('all items takes me home', fakeAsync(() => {
    const linkDes = allLinkDes[1];
    expectPathToBe(location, '', 'link should not have navigated yet');

    click(linkDes);
    advance(fixture);

    expectPathToBe(location, '/');
  }));

  it('unknown takes me to unknown', fakeAsync(() => {
    const linkDes = allLinkDes[2];
    expectPathToBe(location, '', 'link should not have navigated yet');

    click(linkDes);
    advance(fixture);

    expectPathToBe(location, '/unknown');
  }));

  it('login takes me to login', fakeAsync(() => {
    const linkDes = allLinkDes[3];
    expectPathToBe(location, '', 'link should not have navigated yet');

    click(linkDes);
    advance(fixture);

    expectPathToBe(location, '/login');
  }));

  it('signup takes me to signup', fakeAsync(() => {
    const linkDes = allLinkDes[4];
    expectPathToBe(location, '', 'link should not have navigated yet');

    click(linkDes);
    advance(fixture);

    expectPathToBe(location, '/signup');
  }));
}

function toggleMenuTest() {
  it('should show main menu', () => {
    element.query(By.css('button')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.isCollapsed).toBe(false);
  });

  it('should hide main menu', () => {
    component.isCollapsed = false;
    fixture.detectChanges();
    expect(component.isCollapsed).toBe(false);

    element.query(By.css('button')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.isCollapsed).toBe(true);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('isCollapsed should be true by default', () => {
    expect(component.isCollapsed).toBeTruthy();
  });

  it('toggleMenu should change isCollapsed to false', () => {
    component.toggleMenu();
    expect(component.isCollapsed).toBeFalsy();
  });

  it('isCollapsed false should change to true when toggled', () => {
    component.toggleMenu();
    component.toggleMenu();
    expect(component.isCollapsed).toBeTruthy();
  });
}
