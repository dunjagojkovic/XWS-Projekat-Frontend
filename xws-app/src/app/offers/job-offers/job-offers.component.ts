import { Component, OnInit } from '@angular/core';
import { JobOfferService } from 'src/app/service/job-offer.service';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.css']
})
export class JobOffersComponent implements OnInit {

  position = ""

  offer: any = {} as any
  public jobs: any[]

  constructor(public service: JobOfferService) { }

  ngOnInit(): void {

    this.service.jobOffers().subscribe((response: any) => {
      this.offer = response
      this.jobs = this.offer.offers
      
    })
  }

  findJobOffers(){
    let jobPosition ={
      position: this.position
    }
    this.service.findJobOffers(jobPosition).subscribe((response: any) => {
      this.offer = response
      this.jobs = this.offer.offers
      
    })
  }

}
