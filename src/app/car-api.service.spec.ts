import { TestBed, inject } from '@angular/core/testing';

import { CarApiService } from './car-api.service';

describe('CarApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarApiService]
    });
  });

  it('should be created', inject([CarApiService], (service: CarApiService) => {
    expect(service).toBeTruthy();
  }));
});
