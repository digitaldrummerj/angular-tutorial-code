import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Todo } from '../classes/todo';
import { environment } from '../../../environments/environment';

const requestOptions = { withCredentials: true };

@Injectable()
export class TodoService {
  private url = `${environment.apiBaseUrl}/todo`;

  constructor(private http: HttpClient) {}

  save(item: string): Observable<Todo> {
    return this.http.post<Todo>(
      this.url,
      new Todo(item),
      requestOptions
    );
  }

  getAll(): Observable<Todo[]> {
    console.log(this.url);
    return this.http.get<Todo[]>(this.url, requestOptions);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const url = `${this.url}/${todo.id}`;

    return this.http.put<Todo>(url, todo, requestOptions);
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.url}/${todo.id}`;
    return this.http.delete<Todo>(url, requestOptions);
  }
}
