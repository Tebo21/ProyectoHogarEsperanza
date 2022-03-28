import { TestBed } from '@angular/core/testing';

import { MailsenderService } from './mailsender.service';

describe('MailsenderService', () => {
  let service: MailsenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailsenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
