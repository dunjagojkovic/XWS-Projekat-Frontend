import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-job-offer',
  templateUrl: './add-job-offer.component.html',
  styleUrls: ['./add-job-offer.component.css']
})
export class AddJobOfferComponent implements OnInit {

  form: FormGroup;
  hide = true;
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
      position: ['', Validators.required],
      salary: ['', Validators.required],
      responsibilities: ['', Validators.required],
      requirements: ['', Validators.required],
      benefit: ['', Validators.required]
    })

   }

  ngOnInit(): void {
  }

  onSubmit() {
    const position = this.form.get('position')?.value;
    const salary = this.form.get('salary')?.value;
    const responsibilities = this.form.get('responsibilities')?.value;
    const requirements = this.form.get('requirements')?.value;
    const benefit = this.form.get('benefit')?.value;

    let data = {
      position: position,
      salary: salary,
      responsibilities: responsibilities,
      requirements: requirements,
      benefit: benefit,
      companyId: this.id
      
    }

    this.api.addJobOffer(data).subscribe((response: any) => {
      console.log(response)
  });

  }

  logout() {
    this.user = localStorage.clear();
    this.router.navigate(['/']);
  }

}
