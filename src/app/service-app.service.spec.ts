import { TestBed, inject } from '@angular/core/testing';

import { ServiceAppService } from './service-app.service';

describe('ServiceAppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceAppService]
    });
  });

  it('should be created', inject([ServiceAppService], (service: ServiceAppService) => {
    expect(service).toBeTruthy();
  }));
});
