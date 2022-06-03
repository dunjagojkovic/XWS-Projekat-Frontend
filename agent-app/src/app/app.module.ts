import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';

import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatOptionModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { CompaniesComponent } from './companies/companies.component';
import { AddJobOfferComponent } from './add-job-offer/add-job-offer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RegistrationComponent,
    ProfileComponent,
    AdminComponent,
    CompaniesComponent,
    AddJobOfferComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatRadioModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatCardModule,
    MatListModule,
    MatProgressBarModule,
    MatOptionModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
