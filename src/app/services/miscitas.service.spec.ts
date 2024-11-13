import { TestBed } from '@angular/core/testing';

import { MiscitasService } from './miscitas.service';

describe('MiscitasService', () => {
  let service: MiscitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiscitasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
