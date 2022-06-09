import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-approved-companies',
  templateUrl: './approved-companies.component.html',
  styleUrls: ['./approved-companies.component.css']
})
export class ApprovedCompaniesComponent implements OnInit {

  companies: any[]
  public commentList: any[]
  user: any = {} as any
  companyId = ""
  backCompany = ""
  comment = ""
 

  constructor(public service: ApiService, public router: Router) { }

  ngOnInit(): void {


    this.service.current().subscribe((response: any) => {
      this.user = response;
      this.service.getApprovedCompanies().subscribe((response: any) => {
        this.companies = response;
      })
    });
    
  }

  comments(id: string) {
    this.service.getCompanyComments(id).subscribe((response: any) => {
      this.commentList = response;
    })
    this.companyId = id
    this.backCompany = ""
  }

  back(id: string) {
    this.backCompany = id;
    this.companyId = "";
  }

  publishComment(id: string) {
    let comment = {
      companyId: id,
      username: this.user.username,
      content: this.comment
    }
    this.service.commentCompany(comment)
    this.comment = "";
    this.backCompany = id;
    this.companyId = "";

  }

  offers(id: string){
    this.router.navigate(['/jobOffers'] , { queryParams: { id: id } } );
  }

  survey(id: string){

    this.router.navigate(['/companySurvey'] , { queryParams: { id: id } } );

  }

  surveys(id: string){
    this.router.navigate(['/surveys'] , { queryParams: { id: id } } );
  }

}
