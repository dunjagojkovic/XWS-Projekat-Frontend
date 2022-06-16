import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-post-review',
  templateUrl: './post-review.component.html',
  styleUrls: ['./post-review.component.css']
})
export class PostReviewComponent implements OnInit {

  postId = ""
  backPost = ""
  comment = ""

  public commentList: any[]
  posts: any[]

  user: any = {} as any
  userPost: any = {} as any
  userComment: any = {} as any
  element: any;
  followingUsers: any[]
  constructor(public service: PostServiceService, public api: ApiService, public router: Router) { }

  ngOnInit(): void {

    this.api.current().subscribe((response: any) => {
      this.user = response;
      this.api.getFollowing(this.user.username).subscribe((response: any) => {
        this.followingUsers = response;
        console.log(response);
        let data = {
          users: this.followingUsers
        }
        this.service.followingPosts(data).subscribe((response: any) => {
          this.userPost = response
          this.posts = this.userPost.posts
          
        })
      })
      
    });


  }

  comments(id: string) {
    this.service.postComments(id).subscribe((response: any) => {
      this.userComment = response
      this.commentList = this.userComment.comments
    })
    this.postId = id
    this.backPost = ""
  }

  back(id: string) {
    this.backPost = id;
    this.postId = "";
  }

  like(id: string) {
    let data = {
      idPost: id,
      username: this.user.username
    }

    this.service.likePost(data).subscribe((response: any) => {
      this.api.getFollowing(this.user.username).subscribe((response: any) => {
        this.followingUsers = response;
        console.log(response);
        let data = {
          users: this.followingUsers
        }
        this.service.followingPosts(data).subscribe((response: any) => {
          this.userPost = response
          this.posts = this.userPost.posts
          
        })
      })
    })
    
  }

  dislike(id: string) {
     
    let data = {
      idPost: id,
      username: this.user.username
    }
    
    this.service.dislikePost(data).subscribe((response: any) => {
      this.api.getFollowing(this.user.username).subscribe((response: any) => {
        this.followingUsers = response;
        console.log(response);
        let data = {
          users: this.followingUsers
        }
        this.service.followingPosts(data).subscribe((response: any) => {
          this.userPost = response
          this.posts = this.userPost.posts
          
        })
      })
    })
    

  }

  publishComment(id: string) {
    let comment = {
      idPost: id,
      user: this.user.username,
      content: this.comment
    }
    this.service.commentPost(comment)
    this.comment = "";
    this.backPost = id;
    this.postId = "";

  }

  isLiked(id: string) {

    for(let post of this.posts){

      if(post.id == id){
        for(let like of post.likeList){
          if (like == this.user.username){
            return true
          }
        }
      }
    }
    return false
  }

  isDisliked(id: string) {

    for(let post of this.posts){

      if(post.id == id){
        for(let dislike of post.dislikeList){
          if (dislike == this.user.username){
            return true
          }
        }
      }
    }
    return false
  }


}
