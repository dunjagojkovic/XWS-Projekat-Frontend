import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSurveyComponent } from './job-survey.component';

describe('JobSurveyComponent', () => {
  let component: JobSurveyComponent;
  let fixture: ComponentFixture<JobSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
