import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { UserSettingsComponent } from './profile/user-settings/user-settings.component';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import {PasswordResComponent} from "./password-res/password-res.component";
import {UserActivateComponent} from "./user-activate/user-activate.component";
import {SuccessfullActivationComponent} from "./successfull-activation/successfull-activation.component";
import { UserPostsComponent } from './profile/user-posts/user-posts/user-posts.component';
import { PostReviewComponent } from './posts/post-review/post-review.component';
import { PublishPostComponent } from './profile/publish-post/publish-post/publish-post.component';
import { PublicProfileComponent } from './homepage/public-profile/public-profile.component';
import { JobOfferComponent } from './profile/job-offer/job-offer.component';
import { JobOffersComponent } from './offers/job-offers/job-offers.component';
import { SearchProfilesComponent } from './profiles/search-profiles/search-profiles.component';
import { ViewProfileComponent } from './profiles/view-profile/view-profile.component';
import { ViewRequestsComponent } from './profiles/view-requests/view-requests.component';


const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard],  data: {role: 'User'}},
  { path: 'userSettings', component: UserSettingsComponent, canActivate: [AuthGuard],  data: {role: 'User'}},
  { path: 'notFound', component: NotFoundComponent},
  { path: 'activation/:code', component: UserActivateComponent},
  {path: 'reset/:code', component: PasswordResComponent},
  {path: 'successfullactivation', component: SuccessfullActivationComponent},
  { path: 'userPosts', component: UserPostsComponent, canActivate: [AuthGuard],  data: {role: 'User'}},
  { path: 'publishPost', component: PublishPostComponent, canActivate: [AuthGuard],  data: {role: 'User'}},
  { path: 'followingPosts', component: PostReviewComponent, canActivate: [AuthGuard],  data: {role: 'User'}},
  { path: 'createJobOffer', component: JobOfferComponent, canActivate: [AuthGuard],  data: {role: 'User'}},
  { path: 'jobOffers', component: JobOffersComponent, canActivate: [AuthGuard],  data: {role: 'User'}},
  { path: 'searchProfiles', component: SearchProfilesComponent, canActivate: [AuthGuard],  data: {role: 'User'}},
  { path: 'viewProfile', component: ViewProfileComponent, canActivate: [AuthGuard],  data: {role: 'User'}},
  { path: 'viewRequests', component: ViewRequestsComponent, canActivate: [AuthGuard],  data: {role: 'User'}},
  { path: 'publicProfile', component: PublicProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
