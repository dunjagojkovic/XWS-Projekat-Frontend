import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  baseURL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getAuthoHeader() : any {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem("token")
    }
    return{
      headers: headers
    };
  }  

  login(data: any) {
    return this.http.post(this.baseURL + "/api/users/login", data);
  }

  registerUser(data: any) {
    return this.http.post(this.baseURL + "/api/users/register", data);
  }

  current() {
    return this.http.get(this.baseURL + "/api/users/current", this.getAuthoHeader());
  }

  editInfo(id: number, data: any) {
    return this.http.put(this.baseURL + "/api/users/", data, this.getAuthoHeader());
  }

  changePassword(data: any){
    return this.http.post(this.baseURL + "/api/users/changePassword", data, this.getAuthoHeader());
  }

  getPublicProfile() {
    return this.http.get(this.baseURL + "/api/users/public");
  }

  filterUsers(data: any) {
    return this.http.post(this.baseURL + "/api/users/filterUsers", data);
  }

  getUserProfiles() {
    return this.http.get(this.baseURL + "/api/users/users", this.getAuthoHeader());
  }

  getFollowing(username: string) {
    return this.http.get(this.baseURL + "/api/follow/following/" + username, this.getAuthoHeader());
  }

  getRequested(username: string) {
    return this.http.get(this.baseURL + "/api/follow/requested/" + username, this.getAuthoHeader());
  }

  follow(data: any){
    return this.http.post(this.baseURL + "/api/follow/follower", data, this.getAuthoHeader());
  }

  getUser(username: string) {
    return this.http.get(this.baseURL + "/api/users/user/" + username, this.getAuthoHeader());
  }

}
