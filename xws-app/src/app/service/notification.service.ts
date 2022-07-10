import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

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

  getNotifications(id : string) {
    return this.http.get(this.baseURL + "/notifications/" + id,  this.getAuthoHeader());
  }

  markAsRead(data: any){
    return this.http.put(this.baseURL + "/notificationStatus", data,  this.getAuthoHeader());
  }

  createNotifications(data: any){
    return this.http.post(this.baseURL + "/notifications", data,  this.getAuthoHeader());
  }

  createNotification(data: any){
    return this.http.post(this.baseURL + "/notification", data,  this.getAuthoHeader());
  }
}
