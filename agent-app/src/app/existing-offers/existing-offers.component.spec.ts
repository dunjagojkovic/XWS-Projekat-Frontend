import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingOffersComponent } from './existing-offers.component';

describe('ExistingOffersComponent', () => {
  let component: ExistingOffersComponent;
  let fixture: ComponentFixture<ExistingOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
