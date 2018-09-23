import { TestBed, inject } from '@angular/core/testing';

import { PrService } from './pr.service';

describe('PrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrService]
    });
  });

  it('should be created', inject([PrService], (service: PrService) => {
    expect(service).toBeTruthy();
  }));
});
