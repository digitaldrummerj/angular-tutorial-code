import { Component, OnInit } from '@angular/core';
import { GreetingService } from '../shared/services/greeting.service';

@Component({
  selector: 'app-simple-component-with-service',
  templateUrl: './simple-component-with-service.component.html',
  styleUrls: ['./simple-component-with-service.component.scss']
})
export class SimpleComponentWithServiceComponent implements OnInit {
  subject: string;
  greeting: string;
  punctuation: string;

  constructor(private greetingService: GreetingService) { }

  ngOnInit() {
    this.greetingService.getSubject().subscribe((result) => {
      this.subject = result;
    });

    this.greetingService.getGreeting().subscribe((result) => {
      this.greeting = result;
    });

    this.greetingService.getPunctuation().subscribe((result) => {
      this.punctuation = result;
    });
  }

}
