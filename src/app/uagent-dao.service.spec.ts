import { TestBed } from '@angular/core/testing';

import { UagentDaoService } from './uagent-dao.service';

describe('UagentDaoService', () => {
  let service: UagentDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UagentDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
