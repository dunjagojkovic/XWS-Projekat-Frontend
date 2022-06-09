import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.css']
})
export class JobOffersComponent implements OnInit {

  constructor(public service: ApiService, public router: Router) { }

  public offers: any[]
  public commentList: any[]
  public salaryList: any[]
  user: any = {} as any
  offerId = ""
  backOffer = ""
  salaryBack = ""
  offerSalaryId = ""
  comment = ""
  amount = ""

  ngOnInit(): void {

    this.service.current().subscribe((response: any) => {
      this.user = response;
      this.service.getJobOffers().subscribe((response: any) => {
        this.offers = response;
      })

    });


  }

  comments(id: string) {
    this.service.getOfferComments(id).subscribe((response: any) => {
      this.commentList = response;
    })
    this.offerId = id
    this.backOffer = ""
  }

  salaries(id: string){

    this.service.getOfferSalaries(id).subscribe((response: any) => {
      
      this.salaryList = response;
    })
    this.offerSalaryId = id
    this.salaryBack = "";
  
  }

  back(id: string) {
    this.backOffer = id;
    this.offerId = "";
  }

  publishComment(id: string) {
    let comment = {
      jobOfferId: id,
      username: this.user.username,
      content: this.comment
    }
    this.service.commentOffer(comment)
    this.comment = "";
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
    this.salaryBack = id
    this.offerSalaryId = ""

  }

  backSalary(id: string) {
    this.salaryBack = id
    this.offerSalaryId = ""
  }

  survey(id: string){

    this.router.navigate(['/jobSurvey'] , { queryParams: { id: id } } );

  }

  surveys(id: string){
    this.router.navigate(['/surveys'] , { queryParams: { id: id } } );
  }

}
