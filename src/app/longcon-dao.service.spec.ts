import { TestBed } from '@angular/core/testing';

import { LongconDaoService } from './longcon-dao.service';

describe('LongconDaoService', () => {
  let service: LongconDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LongconDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
