import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleComponent } from './simple.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('SimpleComponent', () => {
  let component: SimpleComponent;
  let fixture: ComponentFixture<SimpleComponent>;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('greets the subject', () => {
    const h1 = element.query(By.css('h1'));
    expect(h1.nativeElement.innerText).toBe('Hello World!');
  });
});
