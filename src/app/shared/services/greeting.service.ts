import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class GreetingService {
  subject = 'World';
  constructor() { }

  getGreeting(): Observable<string> { return Observable.of('Hello'); }

  getSubject(): Observable<string> { return Observable.of(this.subject); }

  getPunctuation(): Observable<string> { return Observable.of('!'); }
}
