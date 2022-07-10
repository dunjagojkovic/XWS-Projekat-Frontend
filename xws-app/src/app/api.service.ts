import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  baseURL = "http://localhost:8000";

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
    return this.http.post(this.baseURL + "/login", data);
  }

  registerUser(data: any) {
    return this.http.post(this.baseURL + "/register", data);
  }

  currentUser(username: any) {
    return this.http.get(this.baseURL + "/current/" + username, this.getAuthoHeader());
  }

  editInfo( data: any) {
    return this.http.put(this.baseURL + "/edit", JSON.stringify(data), this.getAuthoHeader());
  }

  changePassword(data: any){
    return this.http.post(this.baseURL + "/editPassword", data, this.getAuthoHeader());
  }

  changePrivacy(data: any){
    return this.http.post(this.baseURL + "/editPrivacy", data, this.getAuthoHeader());
  }

  getPublicProfile() {
    return this.http.get(this.baseURL + "/publicUsers");
  }

  filterUsers(searchTerm: any) {
    return this.http.get(this.baseURL + "/filterUsers/" + searchTerm);
  }

  getUserProfiles() {
    return this.http.get(this.baseURL + "/users", this.getAuthoHeader());
  }

  getUsersById(data: any) {
    return this.http.post(this.baseURL + "/usersById", data, this.getAuthoHeader());
  }

  getUserUsernamesById(data: any) {
    return this.http.post(this.baseURL + "/userUsernamesById", data, this.getAuthoHeader());
  }

  getFollowing(username: string) {
    return this.http.get(this.baseURL + "/api/follow/following/" + username, this.getAuthoHeader());
  }


  getUser(id: any) {
    return this.http.get(this.baseURL + "/user/" + id, this.getAuthoHeader());
  }

}
