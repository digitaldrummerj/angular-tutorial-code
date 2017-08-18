import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleComponentWithAsyncServiceComponent } from './simple-component-with-async-service.component';

describe('SimpleComponentWithAsyncServiceComponent', () => {
  let component: SimpleComponentWithAsyncServiceComponent;
  let fixture: ComponentFixture<SimpleComponentWithAsyncServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleComponentWithAsyncServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleComponentWithAsyncServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
