import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { FollowService } from 'src/app/service/follow.service';

@Component({
  selector: 'app-message-history',
  templateUrl: './message-history.component.html',
  styleUrls: ['./message-history.component.css']
})
export class MessageHistoryComponent implements OnInit {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];


  public users: any[]
  public requests: any[]
  public requestedUsers: any[]
  userAccount: any = {} as any
  request: any = {} as any;
  user: any = {} as any;
  userProfile: any = {} as any;
  userRequest: any = {} as any

  constructor(public service : ApiService, public router : Router, public followService: FollowService) {

  }

  ngOnInit(): void {

    var user =  localStorage.getItem('username');
    this.service.currentUser(user).subscribe((response: any) => {
      this.userAccount = response;
      this.service.getUserProfiles().subscribe((response: any) => {
        this.userProfile = response;
        this.users = this.userProfile.users;
              let data = {
                userById: this.users
              }
              this.service.getUsersById(data).subscribe((response: any) => {
                this.userRequest = response;
                this.requestedUsers = this.userRequest.users;
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



  viewProfile(id: string, username : string) {

      this.router.navigate(['/viewProfile'] , { queryParams: { username: username, id: id } } );
  }


  logout() {
    this.userAccount = localStorage.clear();
    this.router.navigate(['/']);
  }

  
  }

 

