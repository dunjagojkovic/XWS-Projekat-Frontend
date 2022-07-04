import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { FollowService } from 'src/app/service/follow.service';

@Component({
  selector: 'app-suggested-profiles',
  templateUrl: './suggested-profiles.component.html',
  styleUrls: ['./suggested-profiles.component.css']
})
export class SuggestedProfilesComponent implements OnInit {

  public user='';
  public users: any[]
  public following: any[]
  public requested: any[];
  public recommendations: any[]

  userAccount: any = {} as any;
  userProfile: any = {} as any;
  userFollows: any = {} as any;
  userRequested: any = {} as any;
  current: any = {} as any;
  userRecommendation: any = {} as any;
  request: any = {} as any;
  rec: any = {} as any;
  public requestedUsers: any[]



  constructor(public followService : FollowService, public router : Router, public service: ApiService) {


  }

  ngOnInit(): void {
    this.service.currentUser(localStorage.getItem('username')).subscribe((response: any) => {
      this.userAccount = response;
      console.log(this.userAccount);

      this.followService.getRecommended(this.userAccount.id).subscribe((response: any) => {
        this.userRecommendation = response;
        this.recommendations = this.userRecommendation.listId;
        console.log("recommendations",response)

        let data = {
          userById: this.recommendations
        }
        this.service.getUsersById(data).subscribe((response: any) => {
          this.rec = response;
          this.requestedUsers = this.rec.users;
          console.log(this.requestedUsers)
        })

        this.followService.follows(this.userAccount.id).subscribe((response: any) => {
          this.userFollows = response;
          this.following = this.userFollows.follows;
          console.log("follows", response)
        })
        this.followService.getRequested(this.userAccount.id).subscribe((response: any) => {
          this.userRequested = response;
          this.requested = this.userRequested.followRequests;
          console.log(response)

        })

      
      })
    });

  }

  findUser() {


  }

  isFollowed(u : string) {

    for(let user of this.following){
      if(user.id == u){
        return true;
      }
    }

    return false;

  }

  isRequested(u : string) {

    for(let user of this.requested){

      if(user.id == u){
        return true;
      }
    }

    return false;

  }

  follow(user: string) {
    let data = {
      followerId : this.userAccount.id,
      followedId : user
      
    }
    console.log("following", user)

    console.log("userAcc",this.userAccount)
    
    this.followService.follow(data).subscribe((response: any) => {
      console.log(response);
      this.service.getUserProfiles().subscribe((response: any) => {
        this.userProfile = response;
        this.users = this.userProfile.users;
        this.followService.follows(this.userAccount.id).subscribe((response: any) => {
          this.userFollows = response;
          this.following = this.userFollows.follows;
          this.followService.getRequested(this.userAccount.id).subscribe((response: any) => {
            this.userRequested = response;
            this.requested = this.userRequested.followRequests;
           })
        })
      })
    });
  }

  viewProfile(id : any, username: string) {

      this.router.navigate(['/viewProfile'] , { queryParams: { id: id, username: username } } );
  }

  logout() {
    this.current = localStorage.clear();
    this.router.navigate(['/']);
  }


}
