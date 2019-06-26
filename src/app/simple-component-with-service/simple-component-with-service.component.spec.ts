import { tick, fakeAsync, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleComponentWithServiceComponent } from './simple-component-with-service.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { GreetingService } from '../shared/services/greeting.service';
import { Observable, of } from 'rxjs';

export class GreetingServiceStub {
  public subject = 'Test World';
  getGreeting(): Observable<string> { return of('Hello'); }

  getSubject(): Observable<string> { return of(this.subject); }

  getPunctuation(): Observable<string> { return of('!'); }
}

describe('SimpleComponentWithServiceComponent', () => {
  let component: SimpleComponentWithServiceComponent;
  let fixture: ComponentFixture<SimpleComponentWithServiceComponent>;
  let element: DebugElement;
  let greetingService: GreetingService;

  beforeEach(async(() => {
    const testBed = TestBed.configureTestingModule({
      declarations: [SimpleComponentWithServiceComponent],
      // providers: [{ provide: GreetingService, useClass: GreetingServiceStub }]
      providers: [GreetingService]
    });
      testBed.compileComponents();

      greetingService = testBed.get(GreetingService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleComponentWithServiceComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('greets the subject', async(() => {
    spyOn(greetingService, 'getGreeting').and.returnValue(of('Hello'));
    spyOn(greetingService, 'getSubject').and.returnValue(of('World'));
    spyOn(greetingService, 'getPunctuation').and.returnValue(of('!'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const h1 = element.query(By.css('h1'));
      expect(h1.nativeElement.innerText).toBe('Hello World!');
    });
  }));

  it('updates greeting and display', async(() => {
    spyOn(greetingService, 'getGreeting').and.returnValue(of('hello'));
    spyOn(greetingService, 'getSubject').and.returnValue(of('cosmos'));
    spyOn(greetingService, 'getPunctuation').and.returnValue(of(' :)'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const h1 = element.query(By.css('h1'));
      expect(h1.nativeElement.innerText).toBe('hello cosmos :)');
    });
  }));

  it('spying on greets', async(() => {
    spyOn(greetingService, 'getGreeting').and.returnValue(of('hello'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.greeting).toBe('hello');
    });
  }));

  it('spying on subject', async(() => {
    spyOn(greetingService, 'getSubject').and.returnValue(of('cosmos'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.subject).toBe('cosmos');
    });
  }));

  it('spying on puncuation', async(() => {
    spyOn(greetingService, 'getPunctuation').and.returnValue(of(' :)'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.punctuation).toBe(' :)');
    });
  }));

  it('fakeasync ui test', fakeAsync(() => {
    spyOn(greetingService, 'getGreeting').and.returnValue(of('Hello'));
    spyOn(greetingService, 'getSubject').and.returnValue(of('World'));
    spyOn(greetingService, 'getPunctuation').and.returnValue(of('!'));

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const h1 = element.query(By.css('h1'));
    expect(h1.nativeElement.innerText).toBe('Hello World!');

  }));

  it('fakeasync test', fakeAsync(() => {
    spyOn(greetingService, 'getPunctuation').and.returnValue(of(' :)'));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(component.punctuation).toBe(' :)');
  }));
});
