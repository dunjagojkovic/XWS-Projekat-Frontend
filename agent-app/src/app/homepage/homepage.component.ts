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
     }

  loginBox : boolean = false;
  textBox : boolean = true;
  hide = true;
  form: FormGroup;
  user: any = {} as any


  ngOnInit(): void {
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

}
