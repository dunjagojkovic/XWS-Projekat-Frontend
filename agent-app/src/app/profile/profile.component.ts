import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  regBox : boolean = false;
  imgBox : boolean = true;
  hide = true;
  user: any = {} as any;
  
  constructor(
    private api: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.api.current().subscribe((response:any) => {
      this.user = response;     
  });
  }

  logout() {
    this.user = localStorage.clear();
    this.router.navigate(['/']);
  }
}
