import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { UserSettingsComponent } from './profile/user-settings/user-settings.component';

const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'userSettings', component: UserSettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
