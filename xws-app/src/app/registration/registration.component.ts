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
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
      ])],
      passwordRepeat: ['', Validators.required],
      phoneNumber: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required]


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
        birthDate: birthDate
      }

      this.api.registerUser(data).subscribe((response: any) => {
        console.log(response)
    });

  }
}

}
