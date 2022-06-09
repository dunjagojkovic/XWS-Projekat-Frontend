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

  newPass(data: any){
    console.log("sending new pass")
    return this.http.post(this.baseURL + "/api/users/checkForgottenPassword", data )
  }
}
