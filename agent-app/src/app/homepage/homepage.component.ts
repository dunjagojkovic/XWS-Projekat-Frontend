import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, Validators} from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  password: any;
  username: any;
  code: any;

  constructor(
    private router: Router,
    private formBuilder : FormBuilder,
    private service: ApiService,
    private _snackBar: MatSnackBar
    ) {
      this.form = this.formBuilder.group({
        username: ['', Validators.required],
        password: new FormControl(),
        code: new FormControl()
      })
     }

  loginBox : boolean = false;
  textBox : boolean = true;
  codeLogin : boolean = false;
  passwordLogin : boolean = true;
  hide = true;
  form: FormGroup;
  user: any = {} as any;


  ngOnInit(): void {

  }


  onSubmit() {
    if(this.form.valid){
      const username = this.form.get('username')?.value;
      const password = this.form.get('password')?.value;
      const code = this.form.get('code')?.value;

      let data = {
        username: username,
        password: password,
        code: code
      }

      this.service.login(data).subscribe((any: any) => {
        console.log(data);
        localStorage.setItem('token', any.token);
        localStorage.setItem('key', any.key);

        this.service.current().subscribe((user: any) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.user = user
          console.log(user);
          if(user.type == "Potential company owner" || user.type == "Company owner" || user.type == "User"){
            this.router.navigate(['/profile']);
          }
          if(user.type == "Admin"){
            this.router.navigate(['/admin']);
          }
          let userKey = {
            key: localStorage.getItem('key'),
            username: this.user.username

          }
          this.service.addKey(userKey);
        }, error => {
          this._snackBar.open('Incorrect credentials! Please try again.', 'Close', {duration: 2000})});
      })
    }
  }

  TryCodeLogin(){
    const username = this.form.get('username')?.value
    console.log(username)

    let data = {
      username: username
    }
    this.codeLogin = true;
    this.passwordLogin = false;
    this.password=null;
    this.form.get('password')?.setValue('');


    this.service.sendEmailCode(data).subscribe((any: any) => {
      this._snackBar.open('We sent a code to your email!', 'Close', {duration: 2000});
      console.log(any);
      this.password=null;
    }, error => {
      console.log(error)
      this._snackBar.open('Something is wrong!', 'Close', {duration: 2000})})
  }

  resetPass() {
    const username = this.form.get('username')?.value
    console.log(username)
    let data = {
      username: username
    }
    this.service.resetPass(data).subscribe((any: any) => {
      this._snackBar.open('Check your email!', 'Close', {duration: 2000});
      console.log(any);
    }, error => {
      console.log(error)
      this._snackBar.open('Something is wrong!', 'Close', {duration: 2000})})
  }




}
