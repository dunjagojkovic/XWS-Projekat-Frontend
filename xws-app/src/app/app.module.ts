import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from './api.service';
import { AuthGuard } from './auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';



import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatIconModule} from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';


import { HomepageComponent } from './homepage/homepage.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { UserSettingsComponent } from './profile/user-settings/user-settings.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PasswordResComponent } from './password-res/password-res.component';
import { UserActivateComponent } from './user-activate/user-activate.component';
import { SuccessfullActivationComponent } from './successfull-activation/successfull-activation.component';
import { UserPostsComponent } from './profile/user-posts/user-posts/user-posts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostReviewComponent } from './posts/post-review/post-review.component';
import { PublishPostComponent } from './profile/publish-post/publish-post/publish-post.component';
import { PublicProfileComponent } from './homepage/public-profile/public-profile.component';
import { JobOfferComponent } from './profile/job-offer/job-offer.component';
import { JobOffersComponent } from './offers/job-offers/job-offers.component';
import { SearchProfilesComponent } from './profiles/search-profiles/search-profiles.component';
import { ViewProfileComponent } from './profiles/view-profile/view-profile.component';
import { ViewRequestsComponent } from './profiles/view-requests/view-requests.component';




@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RegistrationComponent,
    ProfileComponent,
    UserSettingsComponent,
    NotFoundComponent,
    PasswordResComponent,
    UserActivateComponent,
    SuccessfullActivationComponent,
    UserPostsComponent,
    PostReviewComponent,
    PublishPostComponent,
    PublicProfileComponent,
    JobOfferComponent,
    JobOffersComponent,
    SearchProfilesComponent,
    ViewProfileComponent,
    ViewRequestsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    NgbModule

  ],
  providers: [ApiService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
