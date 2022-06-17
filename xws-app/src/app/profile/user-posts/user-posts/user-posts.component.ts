import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { PostServiceService } from 'src/app/service/post-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  public posts: any[]
  public commentList: any[]
  public likeList: any[]
  public dislikeList: any[]

  isButtonClicked = false;
  postId = ""
  backPost = ""
  likeBack = ""
  dislikeBack = ""
  postLikeId = ""
  postDislikeId = ""

  userPosts: any = {} as any
  user: any = {} as any
  userComment: any = {} as any
  userLike: any = {} as any
  userDislike: any = {} as any
  constructor(public service: PostServiceService, public api: ApiService,     private router: Router,
    ) { }

  ngOnInit(): void {

    this.api.current().subscribe((response: any) => {
      this.user = response;
      this.service.userPosts(this.user.username).subscribe((response: any) => {
        this.userPosts = response;
        this.posts = this.userPosts.posts
      })
              
    });
  }

  comments(id: string) {
    this.service.postComments(id).subscribe((response: any) => {
        this.userComment = response;
        this.commentList = this.userComment.comments
    })   
    this.isButtonClicked = true;
    this.postId = id
    this.backPost = ""
  }

  back(id: string) {
    this.backPost = id;
    this.postId = "";
  }

  likes(id: string) {

    this.service.postLikes(id).subscribe((response: any) => {
      this.userLike = response
      this.likeList = response.likes
    })
    this.postLikeId = id
    this.likeBack = "";
  }

  dislikes(id: string) {
    this.service.postDislikes(id).subscribe((response: any) => {
      this.userDislike = response
      this.dislikeList = this.userDislike.likes
    })
    this.postDislikeId = id
    this.dislikeBack = "";

  }

  backLike(id: string) {
    this.likeBack = id
    this.postLikeId = ""
  }

  backDislike(id: string) {
    this.dislikeBack = id
    this.postDislikeId = ""
  }

  logout() {
    this.user = localStorage.clear();
    this.router.navigate(['/']);
  }


}
