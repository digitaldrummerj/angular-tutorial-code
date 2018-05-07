import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { Todo } from '../classes/todo';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'itemText',
})
export class ItemTextPipe implements PipeTransform {
  constructor(private datePipe: DatePipe, private sanitizer: DomSanitizer) {}

  transform(todo: Todo, args?: any): SafeHtml {
    if (todo === undefined) {
      throw new Error('todo is undefined');
    }

    if (todo === null) {
      throw new Error('todo is null');
    }

    // if (todo instanceof Todo === false) {
    //   throw new Error('parameter todo is not an instance of a Todo class',);
    // }

    if (todo.item === null || todo.item === undefined) {
      throw new Error('todo.item is a required parameter and cannot be null');
    }

    return this.sanitizer.sanitize (
      SecurityContext.HTML,
      `${todo.item} <small>created: ${this.datePipe.transform(todo.createdAt, 'short')}</small>`
    );
  }
}
