import { TestBed } from '@angular/core/testing';

import { NotificationSuccessService } from './notification-success.service';

describe('NotificationSuccessService', () => {
  let service: NotificationSuccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationSuccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
