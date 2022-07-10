import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

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

  follows(id: any) {
    return this.http.get(this.baseURL + "/follows/" + id, this.getAuthoHeader());
  }

  getRequested(id: any) {
    return this.http.get(this.baseURL + "/followRequests/" + id, this.getAuthoHeader());
  }

  follow(data: any){
    return this.http.put(this.baseURL + "/follow", data, this.getAuthoHeader());
  }

  accept(data: any){
    return this.http.put(this.baseURL + "/acceptFollow", data, this.getAuthoHeader());
  }

  deny(data: any){
    return this.http.put(this.baseURL + "/followRequest", data, this.getAuthoHeader());
  }

  getRequests(id: any) {
    return this.http.get(this.baseURL + "/followerRequests/" + id, this.getAuthoHeader());
  }

  getRecommended(id: any) {
    return this.http.get(this.baseURL + "/recommended/" + id, this.getAuthoHeader());
  }

  unfollow(data: any){
    return this.http.put(this.baseURL + "/unfollow", data, this.getAuthoHeader());
  }


  /*

  NE ZNAM STA JE OVO
   getFollowing(username: string) {
    return this.http.get(this.baseURL + "/api/follow/following/" + username, this.getAuthoHeader());
  }
*/
}
