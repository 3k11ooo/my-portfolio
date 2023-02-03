import { TestBed } from '@angular/core/testing';

import { AsynchronousService } from './asynchronous.service';

describe('AsynchronousService', () => {
  let service: AsynchronousService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsynchronousService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
