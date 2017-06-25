import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Todo } from '../classes/todo';

@Injectable()
export class TodoService {
  private options = new RequestOptions({ withCredentials: true });
  constructor(private http: Http) { }

  save(item: string): Observable<Todo> {
    return this.http.post('https://dj-sails-todo.azurewebsites.net/todo', new Todo(item), this.options)
      .map((res: Response) => {
        return <Todo>res.json();
      })
      .catch(error => {
        console.log('save error', error)
        return error;
      });
  }
}
