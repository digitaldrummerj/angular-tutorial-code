import { async, TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { TodoService } from './todo.service';
import { MockBackend } from '@angular/http/testing';
import { MockTodoData } from '../../../testing';

describe('TodoService', () => {
  let service: TodoService;
  let mockBackend: MockBackend;
  const mockTodoData: MockTodoData = new MockTodoData();

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        TodoService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });

    service = bed.get(TodoService);
    mockBackend = bed.get(MockBackend);
  });

  it('Todo Service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('MockBackend should be created', () => {
    expect(mockBackend).toBeTruthy();
  });

  it('should get todo items', async(() => {
    mockBackend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new ResponseOptions({
        body: mockTodoData.todoItems
      })));
    });

    service.getAll()
      .subscribe((result => {
        expect(result.length).toBe(mockTodoData.todoItems.length);
        expect(result).toEqual(mockTodoData.todoItems);
      }));
  }));
});
