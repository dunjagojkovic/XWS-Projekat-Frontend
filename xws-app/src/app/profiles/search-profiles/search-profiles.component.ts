import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-search-profiles',
  templateUrl: './search-profiles.component.html',
  styleUrls: ['./search-profiles.component.css']
})
export class SearchProfilesComponent implements OnInit {

  public user = '';
  public users: any[]
  public following: any[]
  public requested: any[]
  userAccount: any = {} as any

  constructor(public service : ApiService, public router : Router) {


  }

  ngOnInit(): void {
    var user =  localStorage.getItem('username');
    this.service.currentUser(user).subscribe((response: any) => {
      this.userAccount = response;
      this.service.getUserProfiles().subscribe((response: any) => {
        this.users = response;
        this.service.getFollowing(this.userAccount.username).subscribe((response: any) => {
          this.following = response;
          this.service.getRequested(this.userAccount.username).subscribe((response: any) => {
            this.requested = response;
          })
        })
      })
    });

  }

  findUser() {


  }

  isFollowed(u : string) {

    for(let user of this.following){

      if(user == u){
        return true;
      }
    }

    return false;

  }

  isRequested(u : string) {

    for(let user of this.requested){

      if(user == u){
        return true;
      }
    }

    return false;

  }

  follow(user: string) {
    let data = {
      follower : this.userAccount.username,
      following : user
    }
    
    this.service.follow(data).subscribe((response: any) => {
      console.log(response);
      this.service.getUserProfiles().subscribe((response: any) => {
        this.users = response;
        this.service.getFollowing(this.userAccount.username).subscribe((response: any) => {
          this.following = response;
          this.service.getRequested(this.userAccount.username).subscribe((response: any) => {
            this.requested = response;
          })
        })
      })
    });
  }

  viewProfile(username : string) {

      this.router.navigate(['/viewProfile'] , { queryParams: { username: username } } );
  }


}
