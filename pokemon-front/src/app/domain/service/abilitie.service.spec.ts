import { TestBed } from '@angular/core/testing';

import { AbilitieService } from './abilitie.service';

describe('AbilitieService', () => {
  let service: AbilitieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbilitieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
