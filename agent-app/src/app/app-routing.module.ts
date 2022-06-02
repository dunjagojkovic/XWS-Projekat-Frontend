import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { CompaniesComponent } from './companies/companies.component';

const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'myCompanies', component: CompaniesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
