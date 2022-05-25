import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Comment } from 'src/app/model/comment.model';
import { Post } from 'src/app/model/post.model';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  public posts: Post[]
  public commentList: Comment[]
  public likeList: string[]
  public dislikeList: string[]

  isButtonClicked = false;
  postId = ""
  backPost = ""
  likeBack = ""
  dislikeBack = ""
  postLikeId = ""
  postDislikeId = ""

  user: any = {} as any
  constructor(public service: PostServiceService, public api: ApiService) { }

  ngOnInit(): void {

    this.api.current().subscribe((response: any) => {
      this.user = response;
      this.service.userPosts(this.user.username).toPromise()
        .then(res => this.posts = res as Post[])
    });

    //this.service.userPosts().toPromise()
    //.then(res => this.posts = res as Post[])

  }

  comments(id: string) {
    this.service.postComments(id).toPromise()
      .then(res => this.commentList = res as Comment[])
    this.isButtonClicked = true;
    this.postId = id
    this.backPost = ""
  }

  back(id: string) {
    this.backPost = id;
    this.postId = "";
  }

  likes(id: string) {

    this.service.postLikes(id).toPromise()
      .then(res => this.likeList = res as string[])
    this.postLikeId = id
    this.likeBack = "";
  }

  dislikes(id: string) {
    this.service.postDislikes(id).toPromise()
      .then(res => this.dislikeList = res as string[])
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
