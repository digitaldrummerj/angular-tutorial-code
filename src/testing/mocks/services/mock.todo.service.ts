import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Todo, MockTodoData } from '../../../testing';

@Injectable()
export class MockTodoService {
  getAll(): Observable<Array<Todo>> {
    return Observable.of(new MockTodoData().todoItems);
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
