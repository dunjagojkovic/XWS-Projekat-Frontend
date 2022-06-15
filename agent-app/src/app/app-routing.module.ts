import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { CompaniesComponent } from './companies/companies.component';
import { AddJobOfferComponent } from './add-job-offer/add-job-offer.component';
import { JobOffersComponent } from './job-offers/job-offers.component';
import { SurveysComponent } from './surveys/surveys.component';
import { JobSurveyComponent } from './job-survey/job-survey.component';
import { ExistingOffersComponent } from './existing-offers/existing-offers.component';
import { EditCompanyInfoComponent } from './edit-company-info/edit-company-info.component';
import {UserActivateComponent} from "./user-activate/user-activate.component";
import {PasswordResetComponent} from "./password-reset/password-reset.component";
import {SuccessfulActivationComponent} from "./successful-activation/successful-activation.component";
import { ApprovedCompaniesComponent } from './approved-companies/approved-companies.component';


const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'myCompanies', component: CompaniesComponent},
  { path: 'addJobOffer', component: AddJobOfferComponent},
  { path: 'jobOffers', component: JobOffersComponent},
  { path: 'surveys', component: SurveysComponent},
  { path: 'companySurvey', component: JobSurveyComponent},
  { path: 'publishJobOffer', component: ExistingOffersComponent},
  { path: 'editCompanyInfo', component: EditCompanyInfoComponent},
  { path: 'activation/:code', component: UserActivateComponent},
  { path: 'reset/:code', component: PasswordResetComponent},
  { path: 'successfullactivation', component: SuccessfulActivationComponent},
  { path: 'companies', component: ApprovedCompaniesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
