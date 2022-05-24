import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActivation } from './user-activation.component';

describe('RegistrationComponent', () => {
  let component: UserActivation;
  let fixture: ComponentFixture<UserActivation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserActivation ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActivation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});