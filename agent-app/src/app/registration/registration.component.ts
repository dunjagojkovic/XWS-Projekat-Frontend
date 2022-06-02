import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;  
  hide = true;

  constructor(
    private formBuilder : FormBuilder,
    private router: Router,
    private api: ApiService,
    private _snackBar: MatSnackBar
  ) { 
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zčćžšđA-ZČĆŽŠĐ]*')])],
      surname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zčćžšđA-ZČĆŽŠĐ]*')])],
      email: ['', Validators.email],
      username: ['', Validators.required ],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
      phoneNumber: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      type: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.form.valid) {

      const name = this.form.get('name')?.value;
      const surname = this.form.get('surname')?.value;
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      const passwordRepeat = this.form.get('passwordRepeat')?.value;
      const username = this.form.get('username')?.value;
      const phoneNumber = this.form.get('phoneNumber')?.value;
      const gender = this.form.get('gender')?.value;
      const birthDate = this.form.get('birthDate')?.value;
      const type = this.form.get('type')?.value;


      if(passwordRepeat != password) {
        alert('Passwords do not match')
        return;
      }

      let data = {
        name: name,
        surname: surname,
        email: email,
        username: username,
        password: password,
        phoneNumber: phoneNumber,
        gender: gender,
        birthDate: birthDate,
        type: type
      }

      this.api.registerUser(data).subscribe( (any: any) => {
        this.router.navigate(['/'])
      }, error => {
        this._snackBar.open('Username already exists', 'Close', {duration: 5000})
      });
      this._snackBar.open('Registration request successfully submited!', 'Close', {duration: 5000})
    }

  }
}


