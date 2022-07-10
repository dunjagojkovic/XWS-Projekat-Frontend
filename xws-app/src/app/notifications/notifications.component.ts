import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(public notificationService: NotificationService, public service: ApiService) { }
  
  notificationObjest: any = {} as any
  userAccount: any = {} as any
  notifications: any[]
  ngOnInit(): void {
    var user =  localStorage.getItem('username');
    this.service.currentUser(user).subscribe((response: any) => {
      this.userAccount = response;
      this.notificationService.getNotifications(this.userAccount.id).subscribe((response: any) => {
        this.notificationObjest = response;
        this.notifications = this.notificationObjest.notifications;
      })
    })
  }

  markAsRead(id: string){
    let data = {
      id: id,
      status: true
    }
    this.notificationService.markAsRead(data).subscribe((response: any) => {
      console.log(response)
      var user =  localStorage.getItem('username');
    this.service.currentUser(user).subscribe((response: any) => {
      this.userAccount = response;
      this.notificationService.getNotifications(this.userAccount.id).subscribe((response: any) => {
        this.notificationObjest = response;
        this.notifications = this.notificationObjest.notifications;
      })
    })
    })
    
  }

}
