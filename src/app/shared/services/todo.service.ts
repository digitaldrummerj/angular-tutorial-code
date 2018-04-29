import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Todo } from '../classes/todo';

const requestOptions = { withCredentials: true };

@Injectable()
export class TodoService {
  constructor(private http: HttpClient) {}

  save(item: string): Observable<Todo> {
    return this.http.post<Todo>(
      'https://dj-sails-todo.azurewebsites.net/todo',
      new Todo(item),
      requestOptions
    );
  }

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>('https://dj-sails-todo.azurewebsites.net/todo', requestOptions);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const url = `https://dj-sails-todo.azurewebsites.net/todo/${todo.id}`;

    return this.http.put<Todo>(url, todo, requestOptions);
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `https://dj-sails-todo.azurewebsites.net/todo/${todo.id}`;
    return this.http.delete<Todo>(url, requestOptions);
  }
}
