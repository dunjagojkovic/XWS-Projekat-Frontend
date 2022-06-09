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
import { JobOffersComponent } from './job-offers/job-offers.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JobSurveyComponent } from './job-survey/job-survey.component';
import { SurveysComponent } from './surveys/surveys.component';
import { ExistingOffersComponent } from './existing-offers/existing-offers.component';
import { EditCompanyInfoComponent } from './edit-company-info/edit-company-info.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { SuccessfulActivationComponent } from './successful-activation/successful-activation.component';
import { UserActivateComponent } from './user-activate/user-activate.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RegistrationComponent,
    ProfileComponent,
    AdminComponent,
    CompaniesComponent,
    AddJobOfferComponent,
    JobOffersComponent,
    JobSurveyComponent,
    SurveysComponent,
    ExistingOffersComponent,
    EditCompanyInfoComponent,
    PasswordResetComponent,
    SuccessfulActivationComponent,
    UserActivateComponent
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
    MatOptionModule,
    NgbModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
