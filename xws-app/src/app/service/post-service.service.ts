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
      'Authorization' : 'Bearer ' + localStorage.getItem("token")
    }
    return {
      headers: headers
    };
  }

  userPosts(username: string) {
    return this.http.get(this.baseURL + "/posts/" + username, this.getAuthoHeader());
  }

  postComments(id: string) {
    return this.http.get(this.baseURL + "/post/" + id + "/comments", this.getAuthoHeader());
  }

  postLikes(id: string) {
    return this.http.get(this.baseURL + "/post/" + id + "/likes", this.getAuthoHeader());
  }

  postDislikes(id: string) {
    return this.http.get(this.baseURL + "/post/" + id + "/dislikes", this.getAuthoHeader());
  }

  publishPost(post:any) {

    return this.http.post(this.baseURL + "/post", JSON.stringify(post), this.getAuthoHeader());  

  }

  followingPosts(following: any) {
    return this.http.post(this.baseURL + "/following/posts", JSON.stringify(following), this.getAuthoHeader());
  }

  commentPost(comment: any) {

    this.http.post(this.baseURL + "/post/comment", JSON.stringify(comment), this.getAuthoHeader())
      .subscribe(result => {
        console.log(result)
      });

  }

  likePost(user: any) {

    return this.http.post(this.baseURL + "/post/like", JSON.stringify(user), this.getAuthoHeader());
      
  }

  dislikePost(user: any) {

    return this.http.post(this.baseURL + "/post/dislike", JSON.stringify(user), this.getAuthoHeader());
      

  }


}
