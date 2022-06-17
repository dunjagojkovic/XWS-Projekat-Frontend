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
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard],  data: {roles:  ['User', 'Company owner']}},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard],  data: {role: 'Admin'}},
  { path: 'myCompanies', component: CompaniesComponent, canActivate: [AuthGuard], data: {roles:  ['User', 'Company owner']}},
  { path: 'addJobOffer', component: AddJobOfferComponent, canActivate: [AuthGuard],  data: {role: 'Company owner'}},
  { path: 'jobOffers', component: JobOffersComponent,  canActivate: [AuthGuard], data: {roles:  ['User', 'Company owner']}},
  { path: 'surveys', component: SurveysComponent,  canActivate: [AuthGuard],  data: {roles:  ['User', 'Company owner']}},
  { path: 'companySurvey', component: JobSurveyComponent,  canActivate: [AuthGuard], data: {role: 'User'}},
  { path: 'publishJobOffer', component: ExistingOffersComponent,  canActivate: [AuthGuard], data: {role: 'Company owner'}},
  { path: 'editCompanyInfo', component: EditCompanyInfoComponent,  canActivate: [AuthGuard], data: {role: 'Company owner'}},
  { path: 'activation/:code', component: UserActivateComponent},
  { path: 'reset/:code', component: PasswordResetComponent},
  { path: 'successfullactivation', component: SuccessfulActivationComponent},
  { path: 'companies', component: ApprovedCompaniesComponent,  canActivate: [AuthGuard], data: {roles:  ['User', 'Company owner']}},
  { path: 'notFound', component: NotFoundComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
