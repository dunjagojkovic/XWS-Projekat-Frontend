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
  user: any = {} as any;
  description = ""
    
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
        email: [''],
        gender: [''],
        education: ['', Validators.minLength(3)],
        workExperience: ['', Validators.pattern('[a-zčćžšđA-ZČĆŽŠĐ]*')],
        biography: [''],
        hobby: [''],
        interest: [''],
        phoneNumber: ['', Validators.minLength(10)],
      });

      
      this.formPassword = this.formBuilder.group({

        oldPassword: [''],
        newPassword: [''],
        passwordRepeat: ['']

      });
    }

    ngOnInit(): void {
      var user =  localStorage.getItem('username');
      console.log(user)
      this.api.currentUser(user).subscribe((response:any) => {
        this.user = response;     
        console.log(response)
    });
    }
  savePersonalInfo() {

    let name = this.form.get('name')?.value;
    let surname = this.form.get('surname')?.value;
    let email = this.form.get('email')?.value;
    let phoneNumber = this.form.get('phoneNumber')?.value;
    let birthDate = this.form.get('birthDate')?.value;
    let username = this.form.get('username')?.value;
    let gender = this.form.get('gender')?.value;
    console.log(gender)
    let education = this.form.get('education')?.value;
    let workExperience = this.form.get('workExperience')?.value;
    console.log(workExperience)
    let biography = this.form.get('biography')?.value;
    let interest = this.form.get('interest')?.value;
    let hobby = this.form.get('hobby')?.value;

    let data = {

      name: name,
      surname: surname,
      email: email,
      username: this.user.username,
      phoneNumber: phoneNumber,
      gender : gender,
      birthDate: birthDate,
      biography: biography,
      workExperience: {
        id: "4534534573467gdfdgfdgf3",
        description: workExperience
      },
      education: education,
      hobby: hobby,
      interest: interest,
      
    
    }

    this.api.editInfo(data).subscribe((response: any) => {
      console.log(response);
      location.reload();
    });
  }

  saveNewPassword() {

    let newPassword = this.formPassword.get('newPassword')?.value;
    let oldPassword = this.formPassword.get('oldPassword')?.value;
    let passwordRepeat = this.formPassword.get('passwordRepeat')?.value;

    if(passwordRepeat != newPassword) {
      alert('Passwords do not match')
      return;
    }

    let data = {
      newPassword: newPassword,
      oldPassword: oldPassword,
      username: this.user.username
    }

    this.api.changePassword(data).subscribe((response: any) => {
      console.log(response);
    });
  }

  logout() {
    this.user = localStorage.clear();
    this.router.navigate(['/']);
  }

}
