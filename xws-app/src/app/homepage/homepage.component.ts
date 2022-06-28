import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  constructor(
    private router: Router,
    private formBuilder : FormBuilder,
    private service: ApiService,
    private _snackBar: MatSnackBar
    ) {
      this.form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      })
      this.form1 = this.formBuilder.group({
        searchTerm: ['']       
      })
     }

  loginBox : boolean = false;
  textBox : boolean = true;
  hide = true;
  form: FormGroup;
  form1: FormGroup;
  publicUsers : any;
  publicUser: any = {} as any
  users: any = {} as any


  ngOnInit(): void {
    this.service.getPublicProfile().subscribe((response:any) => {
      this.publicUser = response;
      this.publicUsers = this.publicUser.users
      console.log(this.publicUsers);
  });
  }

  onSearch() {
    let searchTerm = this.form1.get('searchTerm')?.value;
    this.service.filterUsers(searchTerm).subscribe((response: any) => {
      console.log(response);
      this.users = response;
      this.publicUsers = this.users.users;
    });
  }

  onSubmit() {
    if(this.form.valid){
      const username = this.form.get('username')?.value;
      const password = this.form.get('password')?.value;

      let data = {
        username: username,
        password: password
      }

      this.service.login(data).subscribe((any: any) => {
        console.log(any);
        localStorage.setItem('token', any.token);

        this.service.currentUser(username).subscribe((user: any) => {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('username', user.username)
          console.log(user);
          
          this.router.navigate(['/userSettings']);
          
        }, error => {
          this._snackBar.open('Incorrect credentials! Please try again.', 'Close', {duration: 2000})});
      })
    }
  }




}
