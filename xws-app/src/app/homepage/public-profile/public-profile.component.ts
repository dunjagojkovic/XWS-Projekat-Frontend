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
  name: any;
  surname: any;

  public commentList: any[]
  public likeList: any[]
  public dislikeList: any[]
  postId = ""
  backPost = ""
  likeBack = ""
  dislikeBack = ""
  postLikeId = ""
  postDislikeId = ""
  userComment: any = {} as any
  userLike: any = {} as any
  userDislike: any = {} as any


  constructor(
    private formBuilder : FormBuilder,
    private router: Router,
    public route: ActivatedRoute,
    private api: ApiService,   
    private service: PostServiceService
  ) { 
    
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
      console.log(this.username); // Print the parameter to the console. 
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
    this.service.userPosts(this.username).subscribe((response: any) => {
      this.userPosts = response;
      this.posts = this.userPosts.posts
      console.log(this.posts);
    });
  }

  comments(id: string) {
    this.service.postComments(id).subscribe((response: any) => {
        this.userComment = response;
        this.commentList = this.userComment.comments
    })   
  
    this.postId = id
    this.backPost = ""
  }

  back(id: string) {
    this.backPost = id;
    this.postId = "";
  }

  likes(id: string) {

    this.service.postLikes(id).subscribe((response: any) => {
      this.userLike = response
      this.likeList = response.likes
    })
    this.postLikeId = id
    this.likeBack = "";
  }

  dislikes(id: string) {
    this.service.postDislikes(id).subscribe((response: any) => {
      this.userDislike = response
      this.dislikeList = this.userDislike.likes
    })
    this.postDislikeId = id
    this.dislikeBack = "";

  }

  backLike(id: string) {
    this.likeBack = id
    this.postLikeId = ""
  }

  backDislike(id: string) {
    this.dislikeBack = id
    this.postDislikeId = ""
  }

}
