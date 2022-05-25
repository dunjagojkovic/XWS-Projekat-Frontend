import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../model/comment.model';
import { Following } from '../model/following.model';
import { PostRequest } from '../model/post-request.model';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {


  baseURL = "http://localhost:8000";

  constructor(private http: HttpClient) { }

  getAuthoHeader(): any {
    const headers = {
      'Content-Type': 'application/json',
    }
    return {
      headers: headers
    };
  }

  userPosts(username: string) {
    return this.http.get(this.baseURL + "/profile/posts/" + username);
  }

  postComments(id: string) {
    return this.http.get(this.baseURL + "/post/" + id + "/comments");
  }

  postLikes(id: string) {
    return this.http.get(this.baseURL + "/post/" + id + "/likes");
  }

  postDislikes(id: string) {
    return this.http.get(this.baseURL + "/post/" + id + "/dislikes");
  }

  publishPost(post: PostRequest) {

    this.http.post(this.baseURL + "/post", JSON.stringify(post))
      .subscribe(result => {
        console.log(result)
      });

  }

  followingPosts(following: Following) {
    return this.http.post(this.baseURL + "/following/posts", JSON.stringify(following));
  }

  commentPost(comment: Comment, id: string) {

    this.http.post(this.baseURL + "/post/" + id + "/comment", JSON.stringify(comment))
      .subscribe(result => {
        console.log(result)
      });

  }

  likePost(user: any, id: string) {

    this.http.post(this.baseURL + "/post/" + id + "/like", JSON.stringify(user))
      .subscribe(result => {
        console.log(result)
      });

  }

  dislikePost(user: any, id: string) {

    this.http.post(this.baseURL + "/post/" + id + "/dislike", JSON.stringify(user))
      .subscribe(result => {
        console.log(result)
      });

  }


}
