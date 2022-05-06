import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

 
  form: FormGroup;
  formPassword: FormGroup;
    
  constructor(
    private formBuilder : FormBuilder,
    private router: Router,
    private api: ApiService,
    private _snackBar: MatSnackBar
    ) { 

      this.form = this.formBuilder.group({

        name: ['', Validators.pattern('[a-zčćžšđA-ZČĆŽŠĐ]*')],
        surname: ['', Validators.pattern('[a-zčćžšđA-ZČĆŽŠĐ]*')],
        username: [''],
        birthDate: [''], 
        email: ['', Validators.required],
        gender: [''],
        education: ['', Validators.minLength(3)],
        workExperience: ['', Validators.pattern('[a-zčćžšđA-ZČĆŽŠĐ]*')],
        biography: ['', Validators.pattern('[a-zčćžšđA-ZČĆŽŠĐ]*')],
        phoneNumber: ['', Validators.minLength(10)],
      });

      
      this.formPassword = this.formBuilder.group({

        oldPassword: [''],
        newPassword: [''],
        passwordRepeat: ['']

      });
    }

  ngOnInit(): void {
  }

  savePersonalInfo() {

    const name = this.form.get('name')?.value;
    const surname = this.form.get('surname')?.value;
    const email = this.form.get('email')?.value;
    const phoneNumber = this.form.get('phoneNumber')?.value;
    const birthDate = this.form.get('birthDate')?.value;
    const password = this.form.get('password')?.value;
    const username = this.form.get('username')?.value;
    const id = this.form.get('id')?.value;
    const gender = this.form.get('gender')?.value;
    const education = this.form.get('education')?.value;
    const workExperience = this.form.get('workExperience')?.value;
    const biography = this.form.get('biography')?.value;



    let data = {

      name: name,
      surname: surname,
      email: email,
      username: username,
      birthDate: birthDate,
      gender: gender,
      education: education,
      workExperience: workExperience,
      biography: biography,     
      phoneNumber: phoneNumber,
      password: password
    }

    this.api.editInfo(id, data).subscribe((response: any) => {
      console.log(response);
    });
  }

  saveNewPassword() {

    const newPassword = this.formPassword.get('newPassword')?.value;
    const oldPassword = this.formPassword.get('oldPassword')?.value;
    const passwordRepeat = this.formPassword.get('passwordRepeat')?.value;

    if(passwordRepeat != newPassword) {
      alert('Passwords do not match')
      return;
    }

    let data = {
      newPassword: newPassword,
      oldPassword: oldPassword
    }

    this.api.changePassword(data).subscribe((response: any) => {
      console.log(response);
    });
  }

}
