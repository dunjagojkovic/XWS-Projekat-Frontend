import { RepositionScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.css']
})
export class ViewRequestsComponent implements OnInit {

  public users: any[]
  public requests: any[]
  userAccount: any = {} as any

  constructor(public service : ApiService, public router : Router) {

  }

  ngOnInit(): void {

    this.service.current().subscribe((response: any) => {
      this.userAccount = response;
      this.service.getUserProfiles().subscribe((response: any) => {
        this.users = response;
          this.service.getRequests(this.userAccount.username).subscribe((response: any) => {
            this.requests = response;
          })
      })
    });

  }

  isPublic(username: string) {

    for(let user of this.users) {
      if(username == user.username && user.isPublic) {
        return true;
      }
    }

    return false;

  }

  accept(username : string) {
    let data = {
      follower: username,
      following: this.userAccount.username
    }

    this.service.accept(data).subscribe((response: any) => { 
      console.log(response);
      this.service.current().subscribe((response: any) => {
        this.userAccount = response;
        this.service.getUserProfiles().subscribe((response: any) => {
          this.users = response;
            this.service.getRequests(this.userAccount.username).subscribe((response: any) => {
              this.requests = response;
            })
        })
      });
    });

  }

  deny(username : string) {
    let data = {
      follower: username,
      following: this.userAccount.username
    }

    this.service.deny(data).subscribe((response: any) => { 
      console.log(response);
      this.service.current().subscribe((response: any) => {
        this.userAccount = response;
        this.service.getUserProfiles().subscribe((response: any) => {
          this.users = response;
            this.service.getRequests(this.userAccount.username).subscribe((response: any) => {
              this.requests = response;
            })
        })
      });
    });
  }

  viewProfile(username : string) {

      this.router.navigate(['/viewProfile'] , { queryParams: { username: username } } );
  }


}
