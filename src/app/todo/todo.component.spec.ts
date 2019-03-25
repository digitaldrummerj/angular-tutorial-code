import { tick, async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControl, Validators } from '@angular/forms';
import { FieldSorter } from '../shared/classes/field-sorter';


import { TodoService } from '../shared/services/todo.service';
import { TodoComponent } from './todo.component';
import { ItemTextPipe } from '../shared/pipe/item-text.pipe';
import { DatePipe } from '@angular/common';
import { Todo, MockTodoData, MockTodoService, click, advance } from '../../testing';

let component: TodoComponent;
let fixture: ComponentFixture<TodoComponent>;
let element: DebugElement;
let itemField: AbstractControl;
let service: TodoService;

describe('TodoComponent', () => {
  setup();
  describe('component create tests', createTests);
  describe('form validation tests', formValidationTests);
  describe('interaction tests', interactionTests);
});

function setup() {
  beforeEach(async(() => {
    const testBed = TestBed.configureTestingModule({
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
    });
      testBed.compileComponents();

      service = testBed.get(TodoService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    element = fixture.debugElement;
    component = element.componentInstance;
    fixture.detectChanges();
    itemField = component.addForm.controls['item'];
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
    // Observable.prototype.debounceTime = function () { return this; };
  });

  beforeEach(() => {
    errors = {};
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

  it('item field required with blank validity', fakeAsync(() => {

    itemField.setValue('');
    advance(fixture, 1000);

    errors = itemField.errors || {};
    expect(errors['required']).toBeDefined('required validator should have triggers');
    expect(errors['minlength']).toBeUndefined('min length validator should not have fired');
    expect(itemField.valid).toBeFalsy();
    expect(component.addForm.valid).toBeFalsy();
    expect(component.formErrors.item).toBe(component.validationMessages.item.required);
  }));

  it('item field required passed', fakeAsync(() => {

    itemField.setValue('test');
    advance(fixture, 1000);

    errors = itemField.errors || {};
    expect(errors['required']).toBeUndefined();
    expect(errors['minlength']).toBeUndefined();
    expect(itemField.valid).toBeTruthy();
    expect(component.addForm.valid).toBeTruthy();

    expect(component.formErrors.item).toBe('');
  }));

  it('item field min length too short validity', fakeAsync(() => {
    itemField.setValue('1');
    advance(fixture, 1000);

    errors = itemField.errors || {};
    expect(errors['minlength']).toBeDefined();
    expect(errors['required']).toBeUndefined();
    expect(itemField.valid).toBeFalsy();
    expect(component.addForm.valid).toBeFalsy();
    expect(component.formErrors.item).toBe(component.validationMessages.item.minlength);
  }));

  it('item field min length passes validity', fakeAsync(() => {
    itemField.setValue('123');
    advance(fixture, 1000);

    errors = itemField.errors || {};
    expect(errors['minlength']).toBeUndefined();
    expect(errors['required']).toBeUndefined();
    expect(itemField.valid).toBeTruthy();
    expect(component.addForm.valid).toBeTruthy();
    expect(component.formErrors.item).toBe('');
  }));
}

function interactionTests() {
  let mockTodoData: MockTodoData;

  beforeEach(() => {
    mockTodoData = new MockTodoData();
  });

  it('service created', () => {
    expect(service).toBeTruthy();
  });

  it('ngOnInit open item count', () => {
    expect(component.openItemCount).toBe(3);
  });

  it('ngOnInit sort items', () => {
    mockTodoData.todoItems.sort(FieldSorter.sort(['completed', 'item'], true));

    expect(component.todoList).toEqual(mockTodoData.todoItems);
  });

  // add
  it('save test', () => {
    // get original counts
    const initialOpenItemCount = component.openItemCount;
    const initialItemCount = component.todoList.length;


    // set field value and save
    itemField.setValue(mockTodoData.newTodoItem.item);
    component.save();
    fixture.detectChanges();

    // make sure that we have a new item
    expect(component.todoList.length).toBe(initialItemCount + 1);
    expect(component.openItemCount).toBe(initialOpenItemCount + 1);
    // validate that the 1st item is the new one since 1 comes before a
    expect(component.todoList[0].item).toBe(mockTodoData.newTodoItem.item);

    // add new item to the mock data and sort it
    mockTodoData.todoItems.push(mockTodoData.newTodoItem);
    mockTodoData.todoItems.sort(FieldSorter.sort(['completed', 'item'], true));

    // verify todo items
    expect(component.todoList).toEqual(mockTodoData.todoItems, 'verify todo items');
  });

  // completed

  // delete

  // get

  // sort
}
