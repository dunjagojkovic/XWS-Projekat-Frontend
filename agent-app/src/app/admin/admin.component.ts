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
  company: any = {} as any;



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

  onAccept(id: any) {
    let data = {
      id: id,
      ownerId: this.user.id

    }
  console.log(data);
  this.api.aproveCompanyRequest(data).subscribe((response:any) => {
    location.reload();
  
  });
  } 

  onDecline(id: number){
    let data = {
      id: id
    }
    console.log(data);
  this.api.declineCompanyRequest(data).subscribe((response:any) => {
    location.reload();
  
  });
  }
}
