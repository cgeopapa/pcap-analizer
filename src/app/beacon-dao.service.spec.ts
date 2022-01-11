import { TestBed } from '@angular/core/testing';

import { BeaconDaoService } from './beacon-dao.service';

describe('BeaconDaoService', () => {
  let service: BeaconDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeaconDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
