import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companies : any;

  constructor(
    private api: ApiService,
  ) { 
    this.companies = [];
  }

  ngOnInit(): void {
  this.api.getMyCompanies().subscribe((response:any) => {
      this.companies = response;
});
  }

}
