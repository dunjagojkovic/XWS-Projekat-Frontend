import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message-history',
  templateUrl: './message-history.component.html',
  styleUrls: ['./message-history.component.css']
})
export class MessageHistoryComponent implements OnInit {

  current: any = {} as any;

  constructor(private router: Router,
    private api: ApiService,) { }

  ngOnInit(): void {
    this.api.currentUser(localStorage.getItem('username')).subscribe((response:any) => {
      this.current = response;     
      console.log("current", response)
  });
  }

  logout() {
    this.current = localStorage.clear();
    this.router.navigate(['/']);
  }


}
