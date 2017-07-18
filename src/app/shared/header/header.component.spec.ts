import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLinkStubDirective, ButtonClickEvents, click } from '../../../testing';
import { CookieModule } from 'ngx-cookie';
import { MockUserData, MockAuthService, MockHttp, MockHttpResponse } from '../../../testing';
import { Http, Response, ResponseOptions } from '@angular/http';

import { HeaderComponent } from './header.component';
import { AuthService } from '../services/auth.service';

let component: HeaderComponent;
let fixture: ComponentFixture<HeaderComponent>;
let element: DebugElement;

describe('HeaderComponent', () => {
  describe('Create Test', createTest);
  describe('Navigation Test', navigationTests);
  describe('Toggle Menu Test', toggleMenuTest);
});

function setup(triggerDetectChanges: boolean) {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgbModule.forRoot(),
        CookieModule.forRoot()
      ],
      declarations: [
        HeaderComponent,
        RouterLinkStubDirective,
      ],
      providers: [
        MockUserData,
        { provide: AuthService, useClass: MockAuthService },
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

function createTest() {
  setup(true);
  it('should be created', () => {
    expect(component).toBeTruthy();
  });
}

function navigationTests() {
  setup(true);
  let allLinks: RouterLinkStubDirective[];
  let allLinkDes: DebugElement[];

  beforeEach(() => {
    allLinkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    allLinks = allLinkDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
  });

  it('should have 5 routerLinks for menu items in template', () => {
    expect(allLinks.length).toBe(5, 'should have 5 links');
    expect(allLinks[0].linkParams).toEqual('/');
    expect(allLinks[1].linkParams).toEqual('/');
    expect(allLinks[2].linkParams).toEqual('/unknown');
    expect(allLinks[3].linkParams).toEqual('/login');
    expect(allLinks[4].linkParams).toEqual('/signup');
  });

  it('logo takes me home', () => {
    const linkDes = allLinkDes[0];
    const link = allLinks[0];

    expect(link.navigatedTo).toBeNull('link should not have navigated yet');
    click(linkDes);
    fixture.detectChanges();

    expect(link.navigatedTo).toBe('/');
  });


  it('all items takes me home', () => {
    const linkDes = allLinkDes[1];
    const link = allLinks[1];

    expect(link.navigatedTo).toBeNull('link should not have navigated yet');
    click(linkDes);
    fixture.detectChanges();

    expect(link.navigatedTo).toBe('/');
  });


  it('unknown takes me to unknown', () => {
    const linkDes = allLinkDes[2];
    const link = allLinks[2];

    expect(link.navigatedTo).toBeNull('link should not have navigated yet');
    click(linkDes);
    fixture.detectChanges();

    expect(link.navigatedTo).toBe('/unknown');
  });


  it('login takes me to login', () => {
    const linkDes = allLinkDes[3];
    const link = allLinks[3];

    expect(link.navigatedTo).toBeNull('link should not have navigated yet');
    click(linkDes);
    fixture.detectChanges();

    expect(link.navigatedTo).toBe('/login');
  });


  it('signup takes me to signup', () => {
    const linkDes = allLinkDes[4];
    const link = allLinks[4];

    expect(link.navigatedTo).toBeNull('link should not have navigated yet');
    click(linkDes);
    fixture.detectChanges();

    expect(link.navigatedTo).toBe('/signup');
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
