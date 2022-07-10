import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { UserSettingsComponent } from './profile/user-settings/user-settings.component';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserPostsComponent } from './profile/user-posts/user-posts/user-posts.component';
import { PostReviewComponent } from './posts/post-review/post-review.component';
import { PublishPostComponent } from './profile/publish-post/publish-post/publish-post.component';
import { PublicProfileComponent } from './homepage/public-profile/public-profile.component';
import { JobOfferComponent } from './profile/job-offer/job-offer.component';
import { JobOffersComponent } from './offers/job-offers/job-offers.component';
import { SearchProfilesComponent } from './profiles/search-profiles/search-profiles.component';
import { ViewProfileComponent } from './profiles/view-profile/view-profile.component';
import { ViewRequestsComponent } from './profiles/view-requests/view-requests.component';
import { SuggestedProfilesComponent } from './suggested-profiles/suggested-profiles.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { MessageHistoryComponent } from './message-history/message-history.component';
import { ChatComponent } from './chat/chat.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { JobRecommendationsComponent } from './job-recommendations/job-recommendations.component';

const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'userSettings', component: UserSettingsComponent, canActivate: [AuthGuard]},
  { path: 'notFound', component: NotFoundComponent},
  { path: 'userPosts', component: UserPostsComponent, canActivate: [AuthGuard]},
  { path: 'publishPost', component: PublishPostComponent, canActivate: [AuthGuard]},
  { path: 'followingPosts', component: PostReviewComponent, canActivate: [AuthGuard]},
  { path: 'createJobOffer', component: JobOfferComponent, canActivate: [AuthGuard]},
  { path: 'jobOffers', component: JobOffersComponent, canActivate: [AuthGuard]},
  { path: 'searchProfiles', component: SearchProfilesComponent, canActivate: [AuthGuard]},
  { path: 'viewProfile', component: ViewProfileComponent, canActivate: [AuthGuard]},
  { path: 'viewRequests', component: ViewRequestsComponent, canActivate: [AuthGuard]},
  { path: 'publicProfile', component: PublicProfileComponent},
  { path: 'suggestedProfiles', component: SuggestedProfilesComponent, canActivate: [AuthGuard]},
  { path: 'sendMessage', component: SendMessageComponent, canActivate: [AuthGuard]},
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
  { path: 'messageHistory', component: MessageHistoryComponent, canActivate: [AuthGuard]},
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard]},
  { path: 'recommendations', component: JobRecommendationsComponent, canActivate: [AuthGuard]},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
