import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  baseURL = "https://localhost:8080";

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

  activateAccount(code: any){
    return this.http.post(this.baseURL + "/api/users/checkActivationCode", code, {responseType:'text'})
  }

  sendEmailCode(data: any) {
    console.log("in send email")
    return this.http.post(this.baseURL + "/api/users/loginCode", data, {responseType:'text'})
  }

  resetPass( data: any) {
    console.log("in reset")
    return this.http.post(this.baseURL + "/api/users/forgottenpassword", data, {responseType:'text'} )
  }

  newPass(data: any) {
    console.log("sending new pass")
    return this.http.post(this.baseURL + "/api/users/checkForgottenPassword", data)
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

  getRequests(username: string) {
    return this.http.get(this.baseURL + "/api/follow/requests/" + username, this.getAuthoHeader());
  }

  accept(data: any){
    return this.http.post(this.baseURL + "/api/follow/accept", data, this.getAuthoHeader());
  }

  deny(data: any){
    return this.http.post(this.baseURL + "/api/follow/deny", data, this.getAuthoHeader());
  }
}
