export { Todo } from '../../../app/shared/classes/todo';

import { Todo } from '../../../app/shared/classes/todo';
import { MockUserData } from './mock.user.data';

export class MockTodoData {
  private mockUserData: MockUserData = new MockUserData();
  private defaultDate: Date = new Date(2017, 8, 7, 11, 0, 0, 0);
  public todoItems: Array<Todo> = [
    new Todo('Research Unit Testing', true, this.mockUserData.ExistingUser1.id, '1', this.defaultDate, this.defaultDate),
    new Todo('Write Unit Test Code', false, this.mockUserData.ExistingUser1.id, '2', this.defaultDate, this.defaultDate),
    new Todo('Present Unit Test Code', false, this.mockUserData.ExistingUser1.id, '3', this.defaultDate, this.defaultDate),
    new Todo('Get a Good Night Sleep', false, this.mockUserData.ExistingUser1.id, '4', this.defaultDate, this.defaultDate),

  ];

  constructor() { }
}
