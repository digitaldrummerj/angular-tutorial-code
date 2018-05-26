import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TodoService } from '../shared/services/todo.service';
import { Todo } from '../shared/classes/todo';
import { FieldSorter } from '../shared/classes/field-sorter';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  addForm: FormGroup;
  errorMessage: string;
  openItemCount = 0;
  todoList: Todo[] = [];
  formErrors = {
    item: '',
  };

  validationMessages = {
    item: {
      required: 'Item is required.',
      minlength: 'Item must be at least 3 characters',
    },
  };

  constructor(private formBuilder: FormBuilder, private todoService: TodoService) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      item: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.addForm.statusChanges.subscribe(data => this.onStatusChange(data));

    this.onStatusChange();

    this.getTodoListAll();
  }

  onStatusChange(data?: any) {
    if (!this.addForm) {
      return;
    }
    const form = this.addForm;

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in messages) {
            if (messages.hasOwnProperty(key) && control.hasError(key)) {
              this.formErrors[field] += `${messages[key]} `;
            }
          }
        }
      }
    }
  }

  sortItems(): void {
    this.todoList.sort(FieldSorter.sort(['completed', 'item'], true));
  }

  save(): void {
    this.todoService.save(this.addForm.value.item).subscribe(
      result => {
        console.log('save result', result);
        this.todoList.push(result);
        this.openItemCount++;
        this.sortItems();
        this.addForm.reset();
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = `${error.status} ${error.statusText}. ${error.message}`;
      }
    );
  }

  getTodoListAll(): void {
    this.todoService.getAll().subscribe(
      (data: Todo[]) => {
        this.todoList = data;
        this.calculateOpenItems();
        this.sortItems();
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = `${error.status} ${error.statusText}. ${error.message}`;
      }
    );
  }

  completeTodo(todo: Todo): void {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe(
      (data: string) => {
        // do nothing
        console.log('updated todo', data, todo);
        todo.completed ? this.openItemCount-- : this.openItemCount++;
        this.sortItems();
      },
      (error: HttpErrorResponse) => {
        console.log('error', error);
        todo.completed = !todo.completed;
        this.errorMessage = `${error.status} ${error.statusText}. ${error.message}`;
      }
    );
  }

  deleteTodo(todo: Todo): void {
    if (confirm('Are you sure you want to delete?')) {
      // delete call goes here
      this.todoService.deleteTodo(todo).subscribe(
        (data: string) => {
          console.log('deleteTodo response', data, todo);
          const index = this.todoList.indexOf(todo);
          this.todoList.splice(index, 1);
          if (todo.completed === false) {
            this.openItemCount--;
          }
        },
        (error: HttpErrorResponse) => {
          todo.completed = !todo.completed;
          this.errorMessage = `${error.status} ${error.statusText}. ${error.message}`;
        }
      );
    }
  }

  calculateOpenItems(): void {
    this.openItemCount = this.todoList.filter(item => item.completed === false).length;
  }
}
