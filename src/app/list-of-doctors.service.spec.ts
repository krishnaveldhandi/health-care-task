import { TestBed } from '@angular/core/testing';

import { ListOfDoctorsService } from './list-of-doctors.service';

describe('ListOfDoctorsService', () => {
  let service: ListOfDoctorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListOfDoctorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
