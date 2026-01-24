import { TestBed } from '@angular/core/testing';

import { LogService } from './log-service';
import { MessageService } from 'primeng/api';

describe('LogService', () => {
  let service: LogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
    service = TestBed.inject(LogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
