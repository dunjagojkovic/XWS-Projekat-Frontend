import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {

  form: FormGroup;
  user: any = {} as any;
  username: any;
  userPosts: any = {} as any
  public posts: any[]

  constructor(
    private formBuilder : FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,   
    private service: PostServiceService
  ) { 
    
    this.route.queryParams.subscribe(params => {
      let username = params['username'];
      console.log(username); // Print the parameter to the console. 
  })

    this.form = this.formBuilder.group({
      name: [''],
      surname: [''],
      email: [''],
      phoneNumber: [''],
      gender: [''],
      biography: [''],
      education: [''],
      workExperience: ['']
    });

  }

  ngOnInit(): void {
    this.service.userPosts(this.user.username).subscribe((response: any) => {
      this.userPosts = response;
      this.posts = this.userPosts.posts
      console.log(this.posts);
    });
  }

}
