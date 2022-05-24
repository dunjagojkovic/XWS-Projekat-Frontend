import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../api.service";
import {FormBuilder} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-activate',
  templateUrl: './user-activate.component.html',
  styleUrls: ['./user-activate.component.css']
})
export class UserActivateComponent implements OnInit {

  constructor(
    private router: Router,
    private api: ApiService,
    private formBuilder : FormBuilder,
    private service: ApiService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    let url = window.location.href
    var code = url.split('/')[4]

    this.api.activateAccount(code).subscribe((response: any) => {
      console.log(response)
      this.router.navigate(['successfullactivation'])

    }, error=>{
      this.router.navigate(['notFound'])
    });

  }

}
