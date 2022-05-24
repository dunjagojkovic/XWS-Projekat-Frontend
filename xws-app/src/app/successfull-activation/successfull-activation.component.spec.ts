import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfullActivationComponent } from './successfull-activation.component';

describe('SuccessfullActivationComponent', () => {
  let component: SuccessfullActivationComponent;
  let fixture: ComponentFixture<SuccessfullActivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfullActivationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfullActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
