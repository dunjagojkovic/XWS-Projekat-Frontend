import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { FollowService } from 'src/app/service/follow.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-publish-post',
  templateUrl: './publish-post.component.html',
  styleUrls: ['./publish-post.component.css']
})
export class PublishPostComponent implements OnInit {


  url: any;
  msg = "";
  public description = "";
  public link = "";
  public img = "";
  user: any = {} as any
  userFollower: any = {} as any;
  followers: any[]

  constructor(public notificationService: NotificationService,  public service: PostServiceService, public api: ApiService, public router: Router, public followService:FollowService) { }

  ngOnInit(): void {
    var user =  localStorage.getItem('username');
    this.api.currentUser(user).subscribe((response: any) => {
      this.user = response;
      this.followService.followers(this.user.id).subscribe((response: any) => {
        this.userFollower = response;
        this.followers = this.userFollower.followers;
        console.log("followers", response)

      })
    });
  }

  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    this.img = event.target.files[0].name
    console.log(this.img)

    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
    }
  }

  publish() {

    let likeList: string[] = [];
    let dislikeList: string[] = [];
    let commentList: Comment[] = [];

    let post = {
      user: this.user.username,
      image: "assets/" + this.img,
      description: this.description,
      link: this.link,
      likeList: likeList,
      dislikeList: dislikeList,
      commentList: commentList
    }

    var list = []
    for (let f of this.followers){
      let data = {
        text: this.user.name + " je objavio/la novi POST.",
        time: new Date(),
        userId: f.id,
        read: false
      }
      list.push(data)
    }

    console.log(list)
    let data = {
      notifications: list
    }
    this.service.publishPost(post).subscribe((response: any) => {
      this.notificationService.createNotifications(data).subscribe((response: any) => {
        console.log(response)
      })
      this.router.navigate(['/userPosts']);
    })
   
  }

}
