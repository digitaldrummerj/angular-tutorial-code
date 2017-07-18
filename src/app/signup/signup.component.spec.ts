import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { SignupComponent } from './signup.component';
import { AuthService } from '../shared/services/auth.service';

import { RouterLinkStubDirective, MockAuthService, MockUserData, click } from '../../testing';

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
      declarations: [
        SignupComponent,
        RouterLinkStubDirective
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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  let allLinks: RouterLinkStubDirective[];
  let allLinkDes: DebugElement[];

  it('should have 1 routerLink in template', () => {
    allLinkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    allLinks = allLinkDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

    expect(allLinks.length).toBe(1, 'should have 1 links');
    expect(allLinks[0].linkParams).toEqual('/login');
  });

  it('clicking login should navigate to login', () => {
    allLinkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    allLinks = allLinkDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

    const linkDes = allLinkDes[0];
    const link = allLinks[0];

    expect(link.navigatedTo).toBeNull('link should not have navigated yet');
    click(linkDes);
    fixture.detectChanges();

    expect(link.navigatedTo).toBe('/login');
  });

});
