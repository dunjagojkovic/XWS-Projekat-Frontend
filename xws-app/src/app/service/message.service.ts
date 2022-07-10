import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

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

  sendMessage(data: any) {
    return this.http.post(this.baseURL + "/message", data,  this.getAuthoHeader());
  }

  getChats(id : string) {
    return this.http.get(this.baseURL + "/chats/" + id,  this.getAuthoHeader());
  }
  
}
