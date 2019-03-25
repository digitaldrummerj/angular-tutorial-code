import { async, TestBed, inject } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { MockTodoData, Todo } from '../../../testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TodoService', () => {
  let service: TodoService;
  let httpTestingController: HttpTestingController;

  const mockTodoData: MockTodoData = new MockTodoData();

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService],
    });

    service = bed.get(TodoService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
      // Finally, assert that there are no outstanding requests.
      httpTestingController.verify();
  });

  it('Todo Service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get todo items', async(() => {
    service.getAll().subscribe(result => {
      expect(result).toEqual( mockTodoData.todoItems);
      expect(result.length).toBe(mockTodoData.todoItems.length);
    });

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne('https://sails-ws.herokuapp.com/todo');
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush( mockTodoData.todoItems);

  }));
});
