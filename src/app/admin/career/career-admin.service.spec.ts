import { TestBed } from '@angular/core/testing';

import { CareerAdminService } from './career-admin.service';

describe('CareerAdminService', () => {
  let service: CareerAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareerAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
