import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-company-info',
  templateUrl: './edit-company-info.component.html',
  styleUrls: ['./edit-company-info.component.css']
})
export class EditCompanyInfoComponent implements OnInit {

  form: FormGroup;

  user: any = {} as any;
  id: any;
 
  
  constructor(
    private formBuilder : FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute

  ) {

    this.route.queryParams
    .subscribe(params => {
      this.id = params['id'];
    }
  );

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
  /* this.api.getCompanyInfo(this.id).subscribe((response: any) => {
      console.log(response)
  });*/
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
      email: email,
      id: this.id
    }

    this.api.editCompanyInfo(data).subscribe((response: any) => {
      console.log(response)

  });

  }

  logout() {
    this.user = localStorage.clear();
    this.router.navigate(['/']);
  }

}
