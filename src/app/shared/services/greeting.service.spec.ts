import { TestBed, inject } from '@angular/core/testing';

import { GreetingService } from './greeting.service';

describe('GreetingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GreetingService]
    });
  });

  it('should be created', inject([GreetingService], (service: GreetingService) => {
    expect(service).toBeTruthy();
  }));
});
