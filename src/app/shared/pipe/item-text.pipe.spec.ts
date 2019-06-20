
import { TestBed, inject } from '@angular/core/testing';
import { DatePipe } from '@angular/common';

import { ItemTextPipe } from './item-text.pipe';
import { Todo } from '../classes/todo';

describe('ItemTextPipe', () => {
  let pipe: ItemTextPipe;
  let datePipe: DatePipe;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        ItemTextPipe,
        DatePipe,
    ]
    }));

  beforeEach(inject([ItemTextPipe, DatePipe], (i: ItemTextPipe, d: DatePipe) => {
    pipe = i;
    datePipe = d;
  }));

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('check value', () => {
    const createdAt = new Date();
    const updatedAt = new Date();
    const todo = new Todo('testing', false, '1', '1', createdAt, updatedAt);
    expect(pipe.transform(todo)).toBe(`${todo.item} <small>created: ${datePipe.transform(createdAt, 'short')}</small>`);
  });


  it('check value with only settings item', () => {
    const todo = new Todo('testing');
    expect(pipe.transform(todo)).toContain(todo.item);
  });

  it('should throw with undefined todo', () => {
    expect(() => { pipe.transform(undefined) }).toThrowError('todo is undefined');
  });

  it('should throw with null todo', () => {
    expect(() => pipe.transform(null)).toThrowError('todo is null');
  });

  it('should throw with null item value', () => {
    expect(() => pipe.transform(new Todo(null))).toThrowError('todo.item is a required parameter and cannot be null');
  });

  it('should throw with undefined item value', () => {
    expect(() => pipe.transform(new Todo(undefined))).toThrowError('todo.item is a required parameter and cannot be null');
  });

});
