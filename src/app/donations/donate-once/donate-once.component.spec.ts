/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DonateOnceComponent } from './donate-once.component';

describe('DonateOnceComponent', () => {
  let component: DonateOnceComponent;
  let fixture: ComponentFixture<DonateOnceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateOnceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateOnceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
