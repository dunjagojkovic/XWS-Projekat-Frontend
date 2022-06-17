import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-job-survey',
  templateUrl: './job-survey.component.html',
  styleUrls: ['./job-survey.component.css']
})
export class JobSurveyComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute, public service: ApiService, public router: Router) { }

  id: string
  workEnvironment = ""
  opportunities = ""
  benefits = ""
  salary = ""
  supervision = ""
  communication = ""
  colleagues = ""
  user: any = {} as any
  ngOnInit(): void {

    this.activatedRoute.queryParams
      .subscribe(params => {
        this.id = params['id'];
        this.service.current().subscribe((response: any) => {
          this.user = response;
        });
      }
    );
  }

  submit(){
    
    let survey = {
      companyId: this.id,
      workEnvironment: this.workEnvironment,
      opportunities: this.opportunities,
      benefits: this.benefits,
      salary: this.salary,
      supervision: this.supervision,
      communication: this.communication,
      colleagues: this.colleagues,
      username: this.user.username
    }

    this.service.addSurvey(survey);
    this.router.navigate(['/companies']);
  }

}
