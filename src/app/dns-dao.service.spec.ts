import { TestBed } from '@angular/core/testing';

import { DnsDaoService } from './dns-dao.service';

describe('DnsDaoService', () => {
  let service: DnsDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DnsDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
