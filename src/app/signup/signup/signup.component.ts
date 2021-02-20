import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from 'src/app/models/signup';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signup: SignUp;
  public processing: boolean = false;
  public submitted: boolean = false;
  public success: boolean = false;
  public failure: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signup = new SignUp();
  }

  public submit(): void {
    const {name, email, password, password_confirmation} = this.signup;
    console.log("Signing up...");
    this.authService.register({name, email, password, password_confirmation})
        .subscribe(
          () => {
              console.log("User is signed up");
              this.processing = false;
              this.success = true;
              this.router.navigateByUrl('/verification');
          },
          error => {
              console.log(`Some error occured ${error.status}`);
              this.processing = false;
              this.failure = true;
          }
        );
  }

}
