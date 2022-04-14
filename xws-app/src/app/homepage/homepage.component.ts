import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  loginBox : boolean = false;
  textBox : boolean = true;
  hide = true;

  ngOnInit(): void {
  }

}
