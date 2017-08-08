import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Http, Response, ResponseOptions } from '@angular/http';
import { TodoService } from './todo.service';
import { MockHttp, MockHttpResponse } from '../../../testing';

const user = {
  id: 1,
  email: 'foo@foo.com'
};

const todoItems = [
  { item: 'Research Unit Testing', completed: true, user: user.id },
  { item: 'Write Unit Test Code', completed: false, user: user.id },
  { item: 'Present Unit Test Code', completed: false, user: user.id },
  { item: 'Get a Good Night Sleep', completed: false, user: user.id },
];

describe('TodoService', () => {
  let service: TodoService;
  let http: Http;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        TodoService,
        { provide: Http, useClass: MockHttp }
      ]
    });

    http = bed.get(Http);
    expect(http).toBeDefined('Http Mock Class was not found');
    service = bed.get(TodoService);
    expect(service).toBeDefined('TodoService was not found');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get todo items', () => {
    spyOn(http, 'get').and.returnValue(MockHttpResponse.createResponse([...todoItems]));

    service.getAll()
      .subscribe((result => {
        expect(result.length).toBe(todoItems.length);
        expect(result).toEqual(todoItems);
      }));
  });
});
