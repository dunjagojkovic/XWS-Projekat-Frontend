import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { FollowService } from 'src/app/service/follow.service';


@Component({
  selector: 'app-search-profiles',
  templateUrl: './search-profiles.component.html',
  styleUrls: ['./search-profiles.component.css']
})
export class SearchProfilesComponent implements OnInit {

  public user='';
  public users: any[]
  public following: any[]
  public requested: any[]
  userAccount: any = {} as any;
  userProfile: any = {} as any;
  userFollows: any = {} as any;
  userRequested: any = {} as any;
  current: any = {} as any;



  constructor(public followService : FollowService, public router : Router, public service: ApiService) {


  }

  ngOnInit(): void {
    var user =  localStorage.getItem('username');
    this.service.currentUser(user).subscribe((response: any) => {
      this.userAccount = response;
      console.log("logged user", this.userAccount);
      this.service.getUserProfiles().subscribe((response: any) => {
        this.userProfile = response;
        this.users = this.userProfile.users;
        console.log("users",response)

        this.followService.follows(this.userAccount.id).subscribe((response: any) => {
          this.userFollows = response;
          this.following = this.userFollows.follows;
          console.log("follows", response)

          this.followService.getRequested(this.userAccount.id).subscribe((response: any) => {
            this.userRequested = response;
            this.requested = this.userRequested.followRequests;
            console.log(response)

          })
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

  block(id : string)  {
    let data = {
      blockedId: id,
      blockerId: this.userAccount.id,
      status: "block"
    }

    this.service.blockUser(data).subscribe((response : any) => {
      console.log(response);

      var user =  localStorage.getItem('username');
      this.service.currentUser(user).subscribe((response: any) => {
      this.userAccount = response;
      console.log("logged user", this.userAccount);
      this.service.getUserProfiles().subscribe((response: any) => {
        this.userProfile = response;
        this.users = this.userProfile.users;
        console.log("users",response)

        this.followService.follows(this.userAccount.id).subscribe((response: any) => {
          this.userFollows = response;
          this.following = this.userFollows.follows;
          console.log("follows", response)

          this.followService.getRequested(this.userAccount.id).subscribe((response: any) => {
            this.userRequested = response;
            this.requested = this.userRequested.followRequests;
            console.log(response)

          })
        })
      })
    });

    })

  }

  isBlocked(user : any) {
    for(let b of user.blockedUsers) {
      if(b.blockedId == this.userAccount.id) {
        return true;
      }
    }

    for(let bu of this.userAccount.blockedUsers) {
      if(bu.blockedId == user.id) {
        return true;
      }
    }

    return false;
  }

  unblock(id : string) {
    let data = {
      blockedId: id,
      blockerId: this.userAccount.id,
      status: "unblock"
    }

    this.service.unblockUser(data).subscribe((response : any) => {
      console.log("unblock", response);
      var user =  localStorage.getItem('username');
      this.service.currentUser(user).subscribe((response: any) => {
      this.userAccount = response;
      console.log("logged user", this.userAccount);
      this.service.getUserProfiles().subscribe((response: any) => {
        this.userProfile = response;
        this.users = this.userProfile.users;
        console.log("users",response)

        this.followService.follows(this.userAccount.id).subscribe((response: any) => {
          this.userFollows = response;
          this.following = this.userFollows.follows;
          console.log("follows", response)

          this.followService.getRequested(this.userAccount.id).subscribe((response: any) => {
            this.userRequested = response;
            this.requested = this.userRequested.followRequests;
            console.log(response)

          })
        })
      })
    });

    })
  }
  


}
