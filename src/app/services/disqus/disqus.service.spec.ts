/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DisqusService } from './disqus.service';

describe('DisqusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisqusService]
    });
  });

  it('should ...', inject([DisqusService], (service: DisqusService) => {
    expect(service).toBeTruthy();
  }));
});
