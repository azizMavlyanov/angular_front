import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "src/app/home/home.component";
import { AboutComponent } from "src/app/about/about.component";
import { ContactComponent } from "src/app/contact/contact.component";
import { PastPostsComponent } from "src/app/past-posts/past-posts.component";
import { AuthorPostComponent } from "src/app/author-post/author-post.component";
import { ViewPostComponent } from "src/app/view-post/view-post.component";
import { SigninComponent } from "./signin/signin/signin.component";
import { SignupComponent } from "./signup/signup/signup.component";
import { AuthGuard } from "./guards/auth.guard";
import { AccountComponent } from "./account/account/account.component";
import { VerificationComponent } from "./verification/verification.component";
import { PasswordResetComponent } from "./password-reset/password-reset/password-reset.component";
import { PasswordUpdateComponent } from "./password-update/password-update.component";
import { NotfoundComponent } from "./notfound/notfound.component";

const routes: Routes = [
  { path: "login", component: SigninComponent },
  { path: "registration", component: SignupComponent },
  { path: "verification", component: VerificationComponent },
  { path: "forgot", component: PasswordResetComponent },
  { path: "password-update/:email", component: PasswordUpdateComponent},
  { path: "", redirectTo: "/home", pathMatch: "full" }, //default route
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "posts", component: PastPostsComponent },
  { path: "posts/:id", component: ViewPostComponent },
  { path: "author-post", component: AuthorPostComponent, canActivate:[AuthGuard] },
  { path: "account", component: AccountComponent, canActivate:[AuthGuard] },
  { path: "**", component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
