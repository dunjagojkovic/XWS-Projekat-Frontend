import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.css']
})
export class JobOffersComponent implements OnInit {

  constructor(public service: ApiService, public router: Router, public activatedRoute: ActivatedRoute) { }

  public offers: any[]
  public commentList: any[]
  public salaryList: any[]
  user: any = {} as any
  offerId = ""
  backOffer = ""
  amount = ""
  id = ""

  ngOnInit(): void {


    this.activatedRoute.queryParams
    .subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.service.current().subscribe((response: any) => {
        this.user = response;
        this.service.getJobOffers(this.id).subscribe((response: any) => {
          this.offers = response;
        })
  
      });
    }
  );


  }

  salaries(id: string){

    this.service.getOfferSalaries(id).subscribe((response: any) => {
      this.salaryList = response;
    })
    this.offerId = id
    this.backOffer = "";
  
  }

  back(id: string) {
    this.backOffer = id;
    this.offerId = "";
  }

  addSalary(id: string){

    let salary = {
      jobOfferId: id,
      username: this.user.username,
      amount: this.amount
    }

    this.service.addSalary(salary)
    this.amount = "";
    this.backOffer = id;
    this.offerId = "";

  }

  

  

}
