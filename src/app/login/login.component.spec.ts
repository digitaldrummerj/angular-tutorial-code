import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';
import { AuthService } from '../shared/services/auth.service';
import { MockUserData, MockAuthService, RouterLinkStubDirective, click } from '../../testing';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA],

      declarations: [
        LoginComponent,
        RouterLinkStubDirective
      ],
      providers: [
        MockUserData,
        { provide: AuthService, useClass: MockAuthService }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginComponent);
        element = fixture.debugElement;
        component = element.componentInstance;
        return fixture.whenStable().then(() => {
          // if (triggerDetectChanges) {
          fixture.detectChanges();
          // }
        });
      });
  }));


  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  let allLinks: RouterLinkStubDirective[];
  let allLinkDes: DebugElement[];

  it('should have 1 routerLink in template', () => {
    allLinkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    allLinks = allLinkDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

    expect(allLinks.length).toBe(1, 'should have 1 links');
    expect(allLinks[0].linkParams).toEqual('/signup');
  });

  it('clicking signup should navigate to signup', () => {
    allLinkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    allLinks = allLinkDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

    const linkDes = allLinkDes[0];
    const link = allLinks[0];

    expect(link.navigatedTo).toBeNull('link should not have navigated yet');
    click(linkDes);
    fixture.detectChanges();

    expect(link.navigatedTo).toBe('/signup');
  });
});
