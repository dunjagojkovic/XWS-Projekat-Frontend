import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { JobOfferService } from 'src/app/service/job-offer.service';

@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.css']
})
export class JobOfferComponent implements OnInit {

  public position = ""
  public description = ""
  public activities = ""
  public preconditions = ""

  user: any = {} as any
  constructor(public api: ApiService, public service: JobOfferService, public router: Router) { }

  ngOnInit(): void {

    this.api.current().subscribe((response: any) => {
      this.user = response;
    });
  }

  createJobOffer() {
    let offer = {
      position: this.position,
      description: this.description,
      dailyActivities: this.activities,
      precondition: this.preconditions,
      user: this.user.username,
      
    }
    this.service.createJobOffer(offer)
    this.router.navigate(['/jobOffers']);
  }

}
