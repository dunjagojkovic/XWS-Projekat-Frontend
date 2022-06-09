import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-existing-offers',
  templateUrl: './existing-offers.component.html',
  styleUrls: ['./existing-offers.component.css']
})
export class ExistingOffersComponent implements OnInit {

  public user : any = {} as any
  public ownerJobs : any = {} as any
  public offers : any[]
  public allOffers : any[]
  public id : any

  constructor(public service : ApiService, public route: ActivatedRoute, public router : Router) { }

  ngOnInit(): void {

    this.route.queryParams
    .subscribe(params => {
      this.id = params['id'];
      this.service.current().subscribe((response: any) => {
        this.user = response;
        let user = {
          ownerKey: localStorage.getItem('key')
        };
        this.service.getExistingJobOffers(user).subscribe((response: any) => {
          this.ownerJobs = response;
          this.offers = this.ownerJobs.offers;
          console.log(response);
          console.log(this.offers);
          this.service.getJobOffers().subscribe((response: any) => {
            this.allOffers = response;
          })
        })
  
      });
    }
    );

  }

  publishOffer(offer: any) {

    let data = {
      position : offer.position,
      responsibilities : offer.dailyActivities,
      requirements : offer.precondition,
      benefit : offer.description,
      companyId: this.id
    }

    this.service.addJobOffer(data).subscribe((response: any) => {
      console.log(response)
    });

    this.router.navigate(['/jobOffers']);

  }

  isPublished(offer: any) {

    for(let o of this.allOffers) {
      if(offer.position == o.position && offer.description == o.benefit 
          && offer.dailyActivities == o.responsibilities && offer.precondition == o.requirements)
        {
          return true;
        }
    }

    return false;
  }

}
