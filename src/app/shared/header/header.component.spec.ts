import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLinkStubDirective, ButtonClickEvents, click } from '../../../testing';
import { CookieModule } from 'ngx-cookie';
import { MockHttp, MockHttpResponse } from '../../../testing';
import { Http, Response, ResponseOptions } from '@angular/http';

import { HeaderComponent } from './header.component';
import { AuthService } from '../services/auth.service';

let component: HeaderComponent;
let fixture: ComponentFixture<HeaderComponent>;
let element: DebugElement;

describe('HeaderComponent', () => {
  it('can instantiate it', () => {
    expect(this.component).not.toBeNull();
  });
  describe('Navigation Test', navigationTests);
  describe('Toggle Menu Test', toggleMenuTest);
});

function navigationTests() {
  setup(true);

  let links: RouterLinkStubDirective[];
  let linkDes: DebugElement[];

  beforeEach(() => {
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    links = linkDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
  });

  it('should have 5 routerLinks for menu items in template', () => {
    const logoLink = links[0];
    const allItemsLink = links[1];
    const unknownLink = links[2];
    const loginLink = links[3];
    const signupLink = links[4];
    expect(links.length).toBe(5, 'should have 5 links');
    expect(logoLink.linkParams).toEqual('/');
    expect(allItemsLink.linkParams).toEqual('/');
    expect(unknownLink.linkParams).toEqual('/unknown');
    expect(loginLink.linkParams).toEqual('/login');
    expect(signupLink.linkParams).toEqual('/signup');
  });

  it('logo takes me home', () => {
    const logoLinkDes = linkDes[0];
    const logoLink = links[0];

    expect(logoLink.navigatedTo).toBeNull('link should not have navigated yet');
    click(logoLinkDes);
    // logoLinkDes.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(logoLink.navigatedTo).toBe('/');
  });
}

function toggleMenuTest() {
  setup(true);

  it('should show main menu', () => {
    element.query(By.css('button:first-child')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.isCollapsed).toBe(false);
  });

  it('should hide main menu', () => {
    component.isCollapsed = false;
    fixture.detectChanges();
    expect(component.isCollapsed).toBe(false);

    element.query(By.css('button:first-child')).triggerEventHandler('click', null);
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

function setup(triggerDetectChanges) {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgbModule.forRoot(),
        CookieModule.forRoot()
      ],
      declarations: [
        HeaderComponent,
        RouterLinkStubDirective
      ],
      providers: [
        AuthService,
        { provide: Http, useClas: MockHttp }
      ],
      schemas: [NO_ERRORS_SCHEMA],  // this ensures it doesnt error on routerLink usage
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        element = fixture.debugElement;
        component = element.componentInstance;
        return fixture.whenStable().then(() => {
          if (triggerDetectChanges) {
            fixture.detectChanges();
          }
        });
      });
  }));



}
