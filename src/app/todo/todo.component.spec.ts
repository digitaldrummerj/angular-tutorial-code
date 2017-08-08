import { tick, async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AbstractControl, Validators } from '@angular/forms';


import { TodoService } from '../shared/services/todo.service';
import { TodoComponent } from './todo.component';
import { ItemTextPipe } from '../shared/pipe/item-text.pipe';
import { DatePipe } from '@angular/common';
import { MockHttpResponse, MockTodoService, click, advance } from '../../testing';

let component: TodoComponent;
let fixture: ComponentFixture<TodoComponent>;
let element: DebugElement;
let itemField: AbstractControl;

describe('TodoComponent', () => {
  setup();
  describe('component create tests', createTests);
  describe('form validation tests', formValidationTests);
  describe('interaction tests', interactionTests);
});

function setup() {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        TodoComponent,
        ItemTextPipe
      ],
      providers: [
        DatePipe,
        { provide: TodoService, useClass: MockTodoService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    element = fixture.debugElement;
    component = element.componentInstance;
    fixture.detectChanges();
  });
}

function createTests() {
  it('should be created', () => {
    expect(component).toBeTruthy();
  });
}

function formValidationTests() {
  let errors = {};
  beforeAll(() => {
    // monkey patches debounce time to make field validation errors test past.
    Observable.prototype.debounceTime = function () { return this; };
  });

  beforeEach(() => {
    errors = {};
    itemField = component.addForm.controls['item'];
    expect(itemField).toBeTruthy('item field was not found');

    if (itemField) {
      itemField.markAsDirty();
      expect(itemField.dirty).toBeTruthy('field should be dirty');
      fixture.detectChanges();
    }
  });

  it('form invalid when empty', () => {
    expect(component.addForm.valid).toBeFalsy();
  });

  it('item field initial  validity', () => {
    // check form status
    expect(itemField.valid).toBeFalsy();
    expect(component.addForm.valid).toBeFalsy();

    // check validation errors
    errors = itemField.errors || {};
    expect(errors['required']).toBeTruthy();
    expect(errors['minlength']).toBeUndefined();

    // check displayed validation messages
    expect(component.formErrors.item).toBe('');
  });

  it('item field required with blank validity', () => {

    itemField.setValue('');

    errors = itemField.errors || {};
    expect(errors['required']).toBeDefined('required validator should have triggers');
    expect(errors['minlength']).toBeUndefined('min length validator should not have fired');
    expect(itemField.valid).toBeFalsy();
    expect(component.addForm.valid).toBeFalsy();
    expect(component.formErrors.item).toBe(component.validationMessages.item.required);
  });

  it('item field required passed', () => {

    itemField.setValue('test');
    errors = itemField.errors || {};
    expect(errors['required']).toBeUndefined();
    expect(errors['minlength']).toBeUndefined();
    expect(itemField.valid).toBeTruthy();
    expect(component.addForm.valid).toBeTruthy();

    expect(component.formErrors.item).toBe('');
  });

  it('item field min length too short validity', () => {
    itemField.setValue('1');
    errors = itemField.errors || {};
    expect(errors['minlength']).toBeDefined();
    expect(errors['required']).toBeUndefined();
    expect(itemField.valid).toBeFalsy();
    expect(component.addForm.valid).toBeFalsy();
    expect(component.formErrors.item).toBe(component.validationMessages.item.minlength);
  });

  it('item field min length passes validity', () => {
    itemField.setValue('123');
    errors = itemField.errors || {};
    expect(errors['minlength']).toBeUndefined();
    expect(errors['required']).toBeUndefined();
    expect(itemField.valid).toBeTruthy();
    expect(component.addForm.valid).toBeTruthy();
    expect(component.formErrors.item).toBe('');
  });
};

function interactionTests() {
  beforeEach(() => {

  })
  // add
  // it('save test', () => {
  //   const injector = fixture.debugElement.injector;
  //   const service: TodoService = injector.get(TodoService);
  //   expect(service).not.toBeUndefined('TodoService Mock Class was not found');

  //   spyOn(service, 'getAll').and.returnValue(MockHttpResponse.createResponse([]));

  //   expect(component.todoList.length).toBe(0, 'todo list should be empty');
  //   expect(component.openItemCount).toBe(0, 'openItemCount should be 0');

  //   itemField.setValue('save test');
  //   // component.save();
  // })
  // completed

  // delete

  // get

  // sort
}
