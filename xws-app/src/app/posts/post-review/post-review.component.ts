import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Comment } from 'src/app/model/comment.model';
import { Following } from 'src/app/model/following.model';
import { Post } from 'src/app/model/post.model';
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

  public commentList: Comment[]
  public likeList: string[]
  public dislikeList: string[]
  posts: Post[]

  user: any = {} as any
  constructor(public service: PostServiceService, public api: ApiService, public router: Router) { }

  ngOnInit(): void {

    let users: string[] = ["dejan"]
    let following: Following = {
      Users: users
    }

    this.api.current().subscribe((response: any) => {
      this.user = response;
      this.service.followingPosts(following).toPromise().then(result => {
        this.posts = result as Post[]
      })
    });


  }

  comments(id: string) {
    this.service.postComments(id).toPromise()
      .then(res => this.commentList = res as Comment[])

    this.postId = id
    this.backPost = ""
  }

  back(id: string) {
    this.backPost = id;
    this.postId = "";
  }

  like(id: string) {

    let users: string[] = ["dejan"]
    let following: Following = {
      Users: users
    }
    let data = {
      Username: this.user.username
    }
    this.service.likePost(data, id)
    this.service.followingPosts(following).toPromise().then(result => {
      this.posts = result as Post[]
    })

  }

  dislike(id: string) {
    let users: string[] = ["dejan"]
    let following: Following = {
      Users: users
    }
    let data = {
      Username: this.user.username
    }
    this.service.dislikePost(data, id)
    this.service.followingPosts(following).toPromise().then(result => {
      this.posts = result as Post[]
    })

  }





  publishComment(id: string) {
    let comment: Comment = {
      User: this.user.username,
      Content: this.comment
    }
    this.service.commentPost(comment, id)
    this.comment = "";
    this.backPost = id;
    this.postId = "";

  }

  isLiked(id: string) {

    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].Id == id) {
        for (let j = 0; j < this.posts[i].LikeList.length; j++) {
          if (this.posts[i].LikeList[j] == this.user.username) {
            return true;
          }
        }
        return false;
      }
    }
    return false;
  }

  isDisliked(id: string) {

    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].Id == id) {
        for (let j = 0; j < this.posts[i].DislikeList.length; j++) {
          if (this.posts[i].DislikeList[j] == this.user.username) {
            return true;
          }
        }
        return false;
      }
    }
    return false;
  }


}
