import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FollowService } from '../service/follow.service';
import { MessageService } from '../service/message.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(public notificationService: NotificationService, public service : ApiService, public messageService : MessageService, public followService : FollowService) { }

  userAccount: any = {} as any
  chat: any = {} as any
  chats: any[]
  idList: any[]
  usersById: any = {} as any
  users: any[]
  messages: any[]
  textMessage: string
  recieverId: string
  reciever: any = {} as any
  userFollows: any = {} as any
  following: any[]



  ngOnInit(): void {
    var user =  localStorage.getItem('username');
    this.service.currentUser(user).subscribe((response: any) => {
      this.userAccount = response;
      console.log(this.userAccount);
      this.messageService.getChats(this.userAccount.id).subscribe((response: any) => {
        this.chat = response;
        this.chats = this.chat.chats 
        console.log("chats", this.chats);
        let data = {
          userById: this.chat.list
        }
        this.service.getUserUsernamesById(data).subscribe((response: any) => {
          this.usersById = response;
          
          this.users = this.usersById.users;
          console.log("users", this.users)
          this.followService.follows(this.userAccount.id).subscribe((response: any) => {
            this.userFollows = response;
            this.following = this.userFollows.follows;
          })
        })
      })
    })
  }

  openMessages(recieverId : string) {
    for(let c of this.chats) {
      if((c.firstUser == recieverId && c.secondUser == this.userAccount.id) || (c.secondUser == recieverId && c.firstUser == this.userAccount.id)) {
        this.messages = c.messages
        this.recieverId = recieverId
        console.log(this.messages)
        this.service.getUser(this.recieverId).subscribe((response : any) => {
          this.reciever = response;
          console.log(this.reciever);
        })
      }
    }
  } 

  isMyMessage(user: string){
    if(user == this.userAccount.id){
      return true;
    }
    return false;
  }

  sendMessage() {
    console.log(this.textMessage);

    let data = {
      text: this.textMessage,
      sender: this.userAccount.id,
      receiver: this.recieverId,
      time: new Date(),
      status: "sent",
    }

    let notification = {
      text: this.userAccount.name + " vam je poslao/la poruku.",
      time: new Date(),
      userId: this.recieverId,
      read: false
    }

    this.messageService.sendMessage(data).subscribe((response: any) => {
      console.log(response)
      this.notificationService.createNotification(notification).subscribe((response: any) => {
        console.log(response)
      })
      location.reload();
    });
  }

  isBlocked() {
    for(let b of this.reciever.blockedUsers) {
      if(b.blockedId == this.userAccount.id) {
        return true;
      }
    }

    for(let bu of this.userAccount.blockedUsers) {
      if(bu.blockedId == this.reciever.id) {
        return true;
      }
    }

    return false;
  } 

  isFollowing() {
    for(let user of this.following){
      if(user.id == this.recieverId){
        return true;
      }
    }
  
    return false;
  
  }
  


}
