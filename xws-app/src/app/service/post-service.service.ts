import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  dislikeLikes(id: string) {
    return this.http.get(this.baseURL + "/post/" + id + "/dislikes");
  }

  publishPost(post: PostRequest) {

    this.http.post(this.baseURL + "/post", JSON.stringify(post))
      .subscribe(result => {
        console.log(result)
      });

  }


}
