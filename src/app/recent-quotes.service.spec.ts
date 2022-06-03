import { TestBed } from '@angular/core/testing';

import { RecentQuotesService } from './recent-quotes.service';

describe('RecentQuotesService', () => {
  let service: RecentQuotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentQuotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
