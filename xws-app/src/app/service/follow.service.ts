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

  /*

  getFollowing(username: string) {
    return this.http.get(this.baseURL + "/api/follow/following/" + username, this.getAuthoHeader());
  }

  getRequested(username: string) {
    return this.http.get(this.baseURL + "/api/follow/requested/" + username, this.getAuthoHeader());
  }

  follow(data: any){
    return this.http.post(this.baseURL + "/api/follow/follower", data, this.getAuthoHeader());
  }

  getRequests(username: string) {
    return this.http.get(this.baseURL + "/api/follow/requests/" + username, this.getAuthoHeader());
  }

  accept(data: any){
    return this.http.post(this.baseURL + "/api/follow/accept", data, this.getAuthoHeader());
  }

  deny(data: any){
    return this.http.post(this.baseURL + "/api/follow/deny", data, this.getAuthoHeader());
  }*/
}
