import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
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

  constructor(public service: PostServiceService, public api: ApiService, public router: Router) { }

  ngOnInit(): void {

    this.api.current().subscribe((response: any) => {
      this.user = response;
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


    this.service.publishPost(post).subscribe((response: any) => {
      this.router.navigate(['/userPosts']);
    })
   
  }

  logout() {
    this.user = localStorage.clear();
    this.router.navigate(['/']);
  }

}
