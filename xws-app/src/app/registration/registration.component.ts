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

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(30),
    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[a-zA-Z0-9@$!%*?&]+$')
  ]));

  constructor(
    private formBuilder : FormBuilder,
    private router: Router,
    private api: ApiService,
    private _snackBar: MatSnackBar
  ) { 
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zčćžšđA-ZČĆŽŠĐ]*')])],
      surname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zčćžšđA-ZČĆŽŠĐ]*')])],
      email: this.email,
      username: ['', Validators.required ],
      password: this.password,
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
        location.reload();
    });

  }
}

getEmailErrorMessage() {
  if (this.email.hasError('required')) {
    return 'You must enter a value';
  }

  return this.email.hasError('email') ? 'Not a valid email' : '';
}

getPasswordErrorMessage() {
  if (this.password.hasError('required')) {
    return 'You must enter a value';
  }
  return this.password.hasError('pattern') ? 'Password must be 8 to 30 characters long, have uppercase and lowercase letters, numbers and symbols' : '';
}

}
