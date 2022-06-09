import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css']
})
export class SurveysComponent implements OnInit {

  id: string
  public surveys: any[]
  constructor(public activatedRoute: ActivatedRoute, public service: ApiService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.id = params['id'];
        this.service.getOfferSurveys(this.id).subscribe((response: any) => {
          this.surveys = response;
        })
      }
    );
  }

}
