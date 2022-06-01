import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobOfferService {

  baseURL = "http://localhost:8000";

  constructor(private http: HttpClient) { }

  createJobOffer(offer:any) {

    this.http.post(this.baseURL + "/job", JSON.stringify(offer))
      .subscribe(result => {
        console.log(result)
      });

  }

  jobOffers() {
    return this.http.get(this.baseURL + "/jobs");
  }

  findJobOffers(jobPosition:any) {

    return this.http.post(this.baseURL + "/jobs/search", JSON.stringify(jobPosition));

  }
}
