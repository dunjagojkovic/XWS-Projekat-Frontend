import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { UserSettingsComponent } from './profile/user-settings/user-settings.component';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserActivation} from './user-activation/user-activation.component';
import {PasswordResComponent} from "./password-res/password-res.component";


const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard],  data: {role: 'User'}},
  { path: 'userSettings', component: UserSettingsComponent, canActivate: [AuthGuard],  data: {role: 'User'}},
  { path: 'notFound', component: NotFoundComponent},
  { path: 'activation/:code', component: UserActivation},
  {path: 'reset/:code', component: PasswordResComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
