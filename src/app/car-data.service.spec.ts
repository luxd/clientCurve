import { TestBed, inject } from '@angular/core/testing';

import { CarDataService } from './car-data.service';

describe('CarDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarDataService]
    });
  });

  it('should be created', inject([CarDataService], (service: CarDataService) => {
    expect(service).toBeTruthy();
  }));
});
