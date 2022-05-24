import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResComponent } from './password-res.component';

describe('PasswordResComponent', () => {
  let component: PasswordResComponent;
  let fixture: ComponentFixture<PasswordResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordResComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
