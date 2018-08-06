import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo, MockTodoData, MockUserData } from '../../../testing';

@Injectable()
export class MockTodoService {
  getAll(): Observable<Array<Todo>> {
    return of(new MockTodoData().todoItems);
  }
  updateTodo(todo: Todo): Observable<Todo> {
    return of(todo);
  }
  save(todoItem: string): Observable<Todo> {
    const mockTodo = new MockTodoData();
    const todo = mockTodo.newTodoItem;

    return of(todo);
  }
  deleteTodo(todo: Todo): Observable<Todo> {
    return of(todo);
   }
}
