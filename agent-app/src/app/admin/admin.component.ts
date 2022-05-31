import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user: any = {} as any;
  companies : any;

  constructor(
    private api: ApiService,
    private router: Router,
  ) { 
    this.companies = [];
  }

  ngOnInit(): void {
    this.api.current().subscribe((response:any) => {
      this.user = response;     
  })

  this.api.getAllCompanies().subscribe((response:any) => {
      this.companies = response;
});
}

  logout() {
    this.user = localStorage.clear();
    this.router.navigate(['/']);
  }
}
