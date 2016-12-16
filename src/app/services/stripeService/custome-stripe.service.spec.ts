/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomeStripeService } from './custome-stripe.service';

describe('Service: CustomeStripe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomeStripeService]
    });
  });

  it('should ...', inject([CustomeStripeService], (service: CustomeStripeService) => {
    expect(service).toBeTruthy();
  }));
});
