import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export { Todo } from '../../../app/shared/classes/todo';
import { Todo } from '../../../app/shared/classes/todo';

@Injectable()
export class MockTodoService {
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
