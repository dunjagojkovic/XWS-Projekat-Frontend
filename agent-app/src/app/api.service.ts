import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  baseURL = "http://localhost:8083";
  baseURL2 = "http://localhost:8000";

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

  getMyCompanies() {
    return this.http.get(this.baseURL + "/api/companies/myCompanies", this.getAuthoHeader());
  }

  getApprovedCompanies() {
    return this.http.get(this.baseURL + "/api/companies/approvedCompanies", this.getAuthoHeader());
  }

  addJobOffer(data: any) {
    return this.http.post(this.baseURL + "/api/jobs/addOffer", data, this.getAuthoHeader());
  }

  getJobOffers(id: string) {
    return this.http.get(this.baseURL + "/api/jobs/offers/" + id, this.getAuthoHeader());
  }

  getCompanyComments(id: string) {
    return this.http.get(this.baseURL + "/api/companies/comments/" + id, this.getAuthoHeader());
  }

  getOfferSalaries(id: string) {
    return this.http.get(this.baseURL + "/api/jobs/salaries/" + id, this.getAuthoHeader());
  }

  getCompanySurveys(id: string) {
    return this.http.get(this.baseURL + "/api/companies/surveys/" + id, this.getAuthoHeader());
  }

  commentCompany(comment: any) {

    this.http.post(this.baseURL + "/api/companies/comment", comment, this.getAuthoHeader())
      .subscribe(result => {
        console.log(result)
      });

  }
  addSalary(salary: any) {

    this.http.post(this.baseURL + "/api/jobs/salary", salary, this.getAuthoHeader())
      .subscribe(result => {
        console.log(result)
      });

  }

  addSurvey(survey: any) {

    this.http.post(this.baseURL + "/api/companies/survey", survey, this.getAuthoHeader())
      .subscribe(result => {
        console.log(result)
      });

  }

  getExistingJobOffers(user:any) {

    return this.http.post(this.baseURL2 + "/owner/jobs", JSON.stringify(user), this.getAuthoHeader());

  }

  editCompanyInfo(data: any) {
    return this.http.put(this.baseURL + "/api/companies/editCompanyInfo", data, this.getAuthoHeader());
  }

  getCompanyInfo(id: number) {
    return this.http.get(this.baseURL + "/api/companies/" + id, this.getAuthoHeader());
  }



  addKey(userKey:any) {
    this.http.post(this.baseURL2 + "/jobs/key", JSON.stringify(userKey), this.getAuthoHeader()).subscribe(result => {
      console.log(result)
    });

  }

}
