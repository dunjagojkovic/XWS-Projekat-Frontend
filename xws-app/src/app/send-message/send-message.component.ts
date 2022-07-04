import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { MessageService } from '../service/message.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';


@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  current: any = {} as any;
  userAccount: any = {} as any;
  form: FormGroup;
  recieverId: any;
  time: any;
  status: any;


  constructor(public router : Router, public route: ActivatedRoute, public service: ApiService, public messageService: MessageService, private formBuilder : FormBuilder,
    ) { 
      this.form = this.formBuilder.group({
        text: ['', Validators.required]     
      })

      this.route.queryParams.subscribe(params => {
        this.recieverId = params['recieverId'];
        console.log(this.recieverId); 
    })
    }

  ngOnInit(): void {
    var user =  localStorage.getItem('username');
    this.service.currentUser(user).subscribe((response: any) => {
      this.userAccount = response;})
  }

  logout() {
    this.current = localStorage.clear();
    this.router.navigate(['/']);
  }

  onSend() {
    if(this.form.valid) {

      const text = this.form.get('text')?.value;
    
      let data = {
        text: text,
        sender: this.userAccount.id,
        receiver: this.recieverId,
        time: this.time,
        status: "send",
      }

      this.messageService.sendMessage(data).subscribe((response: any) => {
        console.log(response)
        //location.reload();
    });

  }
}



}
