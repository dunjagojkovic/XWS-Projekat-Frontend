import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  public username = '';
  user: any = {} as any
  public posts: any[]
  public commentList: any[]
  public likeList: any[]
  public dislikeList: any[]

  postId = ""
  backPost = ""
  likeBack = ""
  dislikeBack = ""
  postLikeId = ""
  postDislikeId = ""

  userPosts: any = {} as any
  userComment: any = {} as any
  userLike: any = {} as any
  userDislike: any = {} as any

  constructor(public route: ActivatedRoute, public service : ApiService, public postService : PostServiceService) { }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        this.username = params['username'];
        this.service.getUser(this.username).subscribe((response: any) =>
          {
            this.user = response;
            this.postService.userPosts(this.user.username).subscribe((response: any) => {
              this.userPosts = response;
              this.posts = this.userPosts.posts
            })
          }
        )  
      }
    );
  }

  comments(id: string) {
    this.postService.postComments(id).subscribe((response: any) => {
        this.userComment = response;
        this.commentList = this.userComment.comments
    })   
    this.postId = id
    this.backPost = ""
  }

  back(id: string) {
    this.backPost = id;
    this.postId = "";
  }

  likes(id: string) {

    this.postService.postLikes(id).subscribe((response: any) => {
      this.userLike = response
      this.likeList = response.likes
    })
    this.postLikeId = id
    this.likeBack = "";
  }

  dislikes(id: string) {
    this.postService.postDislikes(id).subscribe((response: any) => {
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


}
