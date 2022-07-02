import { RepositionScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { FollowService } from 'src/app/service/follow.service';

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.css']
})
export class ViewRequestsComponent implements OnInit {

  public users: any[]
  public requests: any[]
  public requestedUsers: any[]
  userAccount: any = {} as any
  request: any = {} as any;
  user: any = {} as any;

  constructor(public service : ApiService, public router : Router, public followService: FollowService) {

  }

  ngOnInit(): void {

    var user =  localStorage.getItem('username');
    this.service.currentUser(user).subscribe((response: any) => {
      this.userAccount = response;
      this.service.getUserProfiles().subscribe((response: any) => {
        this.users = response;
          this.followService.getRequests(this.userAccount.id).subscribe((response: any) => {
            this.request = response;
            this.requests = this.request.followerRequests;
              console.log(response)
              console.log("pre fora",this.requests)
              this.copyRequest(this.requests);
            /*for(let i of this.requests){
              this.service.getUser(i.id).subscribe((response: any) => {
                this.requestedUsers.push(response);
                console.log("for",response)
              })

            }*/

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

    this.followService.accept(data).subscribe((response: any) => { 
      console.log(response);
      var user =  localStorage.getItem('username');
      this.service.currentUser(user).subscribe((response: any) => {
        this.userAccount = response;
        this.service.getUserProfiles().subscribe((response: any) => {
          this.users = response;
            this.followService.getRequests(this.userAccount.id).subscribe((response: any) => {
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

    this.followService.deny(data).subscribe((response: any) => { 
      var user =  localStorage.getItem('username');
      console.log(response);
      this.service.currentUser(user).subscribe((response: any) => {
        this.userAccount = response;
        this.service.getUserProfiles().subscribe((response: any) => {
          this.users = response;
            this.followService.getRequests(this.userAccount.id).subscribe((response: any) => {
              this.requests = response;
            })
        })
      });
    });
  }

  viewProfile(username : string) {

      this.router.navigate(['/viewProfile'] , { queryParams: { username: username } } );
  }

  copyRequest(list: any[]){
    for(let i of list){
      this.service.getUser(i.id).subscribe((response: any) => {
        this.user = response;
        this.requestedUsers.push(this.user);
        console.log("pre fora",this.user)

      })
    }

  }


}
