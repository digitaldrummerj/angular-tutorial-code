
import {of as observableOf} from 'rxjs';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class GreetingService {
  subject = 'World';
  constructor() { }

  getGreeting(): Observable<string> { return observableOf('Hello'); }

  getSubject(): Observable<string> { return observableOf(this.subject); }

  getPunctuation(): Observable<string> { return observableOf('!'); }
}
