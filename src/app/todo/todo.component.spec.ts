import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { TodoService } from '../shared/services/todo.service';
import { TodoComponent } from './todo.component';
import { Todo } from '../shared/classes/todo';


class MockTodoService {
  getAll(): Observable<Array<Todo>> {
    return Observable.of([new Todo('testing')]);
  }
  updateTodo(todo: Todo): Observable<Todo> {
    return Observable.of(todo);
  }
  save(todo: Todo): Observable<Todo> {
    return Observable.of(todo);
  }
  deleteTodo(todo: Todo): Observable<Todo> {
    return Observable.of(todo);
   }
}

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],

      declarations: [TodoComponent],
      providers: [{ provide: TodoService, useClass: MockTodoService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
