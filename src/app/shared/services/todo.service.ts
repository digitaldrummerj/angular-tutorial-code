import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Todo } from '../classes/todo';
import { environment } from '../../../environments/environment';

@Injectable()
export class TodoService {
  private options = new RequestOptions({ withCredentials: true });
  private url: string = `${environment.apiBaseUrl}/todo`;

  constructor(private http: Http) { }

  save(item: string): Observable<Todo> {
    return this.http.post(this.url, new Todo(item), this.options)
      .map((res: Response) => {
        return <Todo>res.json();
      })
      .catch(error => {
        console.log('save error', error)
        return error;
      });
  }

  getAll(): Observable<Array<Todo>> {
    let url = this.url;
    return this.http.get(url, this.options)
      .map((res: Response) => {
        return <Array<Todo>>res.json();
      })
      .catch(error => {
        console.log('get error', error);
        return error;
      });
  }

  updateTodo(todo: Todo): Observable<Todo> {
    let url = `${this.url}/${todo.id}`;
    return this.http.put(url, todo, this.options)
      .map((res: Response) => <Todo>res.json())
      .catch(error => {
        console.log('update error', error);
        return error;
      });
  }

  deleteTodo(todo: Todo): Observable<Response> {
    let url = `${this.url}/${todo.id}`;
    return this.http.delete(url, this.options)
      .catch(error => {
        console.log('delete error', error);
        return error;
      });
  }
}
