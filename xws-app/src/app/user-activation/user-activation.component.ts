import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';


@Component({
    selector: 'app-registration',
    templateUrl: './user-activation.html',
    styleUrls: ['./user-activation.component.css']
  })
  
  export class UserActivation implements OnInit {
      constructor(
          private router: Router,
        private api: ApiService,
    private formBuilder : FormBuilder,
    private service: ApiService,
    private _snackBar: MatSnackBar) {

        }

    ngOnInit(): void {
        let url = window.location.href
        var code = url.split('/')[4]

        this.api.activateAccount(code).subscribe((response: any) => {
            console.log(response)
        });
    }
  }  