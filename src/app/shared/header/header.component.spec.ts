import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NgbModule.forRoot()],
      declarations: [HeaderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.debugElement.componentInstance;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
});
