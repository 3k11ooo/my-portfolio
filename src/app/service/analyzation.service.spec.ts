import { TestBed } from '@angular/core/testing';

import { AnalyzationService } from './analyzation.service';

describe('AnalyzationService', () => {
  let service: AnalyzationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalyzationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
