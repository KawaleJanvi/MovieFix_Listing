import { TestBed } from '@angular/core/testing';

import { HttpInterfaceService } from './http-interface.service';

describe('HttpInterfaceService', () => {
  let service: HttpInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
