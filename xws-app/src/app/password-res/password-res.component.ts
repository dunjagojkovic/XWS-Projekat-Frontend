import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-password-res',
  templateUrl: './password-res.component.html',
  styleUrls: ['./password-res.component.css']
})
export class PasswordResComponent implements OnInit {
  password: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private service: ApiService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      password: new FormControl(),
      password_repeat: new FormControl()
    })
  }

  form: FormGroup;

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      const password = this.form.get('password')?.value;
      const password_repeat = this.form.get('password_repeat')?.value;
      if(password === password_repeat) {
        let url = window.location.href
        var code = url.split('/')[4]


        let data = {
          newPassword: password,
          code: code
        }
        this.service.newPass(data).subscribe((any: any) => {
          console.log("Success data", any)
          this._snackBar.open("Success!", 'Close', {duration: 2000})
          this.router.navigate([''])
        }, error => {
          this._snackBar.open("Error", 'Close', {duration: 2000})
        });
      }
      else{
        alert("Repeat your password correctly!")
      }

    }

  }
}
