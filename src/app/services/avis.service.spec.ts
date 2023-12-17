import { TestBed } from '@angular/core/testing';

import { AviService } from './avis.service';

describe('AvisService', () => {
  let service: AviService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AviService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
