import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  password: any;
  password_repeat: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private service: ApiService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      password: new FormControl(),
    })
  }

  form: FormGroup;

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid && this.password_repeat.equals(this.password)) {
      const password = this.form.get('password')?.value;
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
    else if (!this.password.equalsthis.password_reset){
      alert("Repeat your password correctly!")
    }

  }
}
