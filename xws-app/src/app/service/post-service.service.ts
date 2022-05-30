import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http.get(this.baseURL + "/posts/" + username);
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

  publishPost(post:any) {

    this.http.post(this.baseURL + "/post", JSON.stringify(post))
      .subscribe(result => {
        console.log(result)
      });

  }

  followingPosts(following: any) {
    return this.http.post(this.baseURL + "/following/posts", JSON.stringify(following));
  }

  commentPost(comment: any) {

    this.http.post(this.baseURL + "/post/comment", JSON.stringify(comment))
      .subscribe(result => {
        console.log(result)
      });

  }

  likePost(user: any) {

    this.http.post(this.baseURL + "/post/like", JSON.stringify(user))
      .subscribe(result => {
        console.log(result)
      });

  }

  dislikePost(user: any) {

    this.http.post(this.baseURL + "/post/dislike", JSON.stringify(user))
      .subscribe(result => {
        console.log(result)
      });

  }


}
