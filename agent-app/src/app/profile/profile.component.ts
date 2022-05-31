import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { state } from '@angular/animations';
import { createInjectorType } from '@angular/compiler/src/render3/r3_injector_compiler';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { HighContrastModeDetector } from '@angular/cdk/a11y';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  regBox : boolean = false;
  imgBox : boolean = true;
  hide = true;
  user: any = {} as any;
 
  
  constructor(
    private formBuilder : FormBuilder,
    private api: ApiService,
    private router: Router,
  ) {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      description: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', Validators.required]
    })
   }

  ngOnInit(): void {
    this.api.current().subscribe((response:any) => {
      this.user = response;     
  });
  }

  onSubmit() {
    const name = this.form.get('name')?.value;
    const address = this.form.get('address')?.value;
    const state = this.form.get('state')?.value;
    const city = this.form.get('city')?.value;
    const description = this.form.get('description')?.value;
    const contact = this.form.get('contact')?.value;
    const email = this.form.get('email')?.value;

    let data = {
      name: name,
      address: address,
      state: state,
      city: city,
      description: description,
      contact: contact,
      email: email
    }

    this.api.registerCompany(data).subscribe((response: any) => {
      console.log(response)
      this.regBox = false;
      this.imgBox = true;
  });

  }

  logout() {
    this.user = localStorage.clear();
    this.router.navigate(['/']);
  }
}
