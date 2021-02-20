import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AuthorPostComponent } from './author-post/author-post.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './loading/loading.component';
import { MastheadComponent } from './masthead/masthead.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PastPostsComponent } from './past-posts/past-posts.component';
import { PreviewPostComponent } from './preview-post/preview-post.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { SigninComponent } from './signin/signin/signin.component';
import { SignupComponent } from './signup/signup/signup.component';
import { StoreModule } from '@ngrx/store';
// import { reducers, metaReducers } from './reducers';
import { authReducer } from './reducers/auth.reducer';
import { AuthInterceptor } from './interceptors/auth.interceptor.ts.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { AccountComponent } from './account/account/account.component';
import { VerificationComponent } from './verification/verification.component';
import { PasswordResetComponent } from './password-reset/password-reset/password-reset.component';
import { PasswordUpdateComponent } from './password-update/password-update.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    AuthorPostComponent,
    ContactComponent,
    FooterComponent,
    LoadingComponent,
    MastheadComponent,
    NavbarComponent,
    PastPostsComponent,
    PreviewPostComponent,
    ViewPostComponent,
    SigninComponent,
    SignupComponent,
    AccountComponent,
    VerificationComponent,
    PasswordResetComponent,
    PasswordUpdateComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({userState: authReducer})
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
