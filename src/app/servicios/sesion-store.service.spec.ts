import { TestBed } from '@angular/core/testing';

import { SesionStoreService } from './sesion-store.service';

describe('SesionStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SesionStoreService = TestBed.get(SesionStoreService);
    expect(service).toBeTruthy();
  });
});
