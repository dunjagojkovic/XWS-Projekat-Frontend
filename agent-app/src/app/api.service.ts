import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  baseURL = "http://localhost:8081";

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
    return this.http.post(this.baseURL + "/api/users/registerUser", data);
  }

  current() {
    return this.http.get(this.baseURL + "/api/users/current", this.getAuthoHeader());
  }

  registerCompany(data: any) {
    return this.http.post(this.baseURL + "/api/companies/registerCompany", data, this.getAuthoHeader());
  }

  getAllCompanies(){
    return this.http.get(this.baseURL + "/api/companies/allPendingCompanies", this.getAuthoHeader())
  }

  declineCompanyRequest(data: any) {
    return this.http.put(this.baseURL + "/api/companies/declineCompanyRequest", data, this.getAuthoHeader());
  }

  aproveCompanyRequest(data: any) {
    return this.http.put(this.baseURL + "/api/companies/approveCompanyRequest", data, this.getAuthoHeader());
  }



}
