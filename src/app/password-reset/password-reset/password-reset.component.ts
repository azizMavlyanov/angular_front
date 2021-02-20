import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SignIn } from 'src/app/models/signin';
import { State } from 'src/app/reducers/auth.reducer';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  public signin: SignIn;
  public processing: boolean = false;
  public submitted: boolean = false;
  public success: boolean = false;
  public failure: boolean = false;

  constructor(private authService: AuthService, private router: Router,
    private store: Store<{userState: State}>) { }

  ngOnInit(): void {
    this.signin = new SignIn();
  }

  public send(): void {
   console.log("Sending instruction for password reset to email...");

   if (this.signin.email) {
    this.authService.resetPassword(this.signin.email)
          .subscribe(
              response => {
                  console.log(`Email has been sent to ${this.signin.email}`);
                  this.processing = false;
                  this.success = true;
                  this.router.navigateByUrl(`/password-update/${this.signin.email}`);
              },
              error => {
                console.log(`Some error occured ${error.status}`);
                this.processing = false;
                this.failure = true;
              }
          );
   }
  }

}
