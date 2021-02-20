import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignIn } from 'src/app/models/signin';
import { AuthService } from 'src/app/service/auth.service';
import { Store } from '@ngrx/store';
import {login, logout} from '../../actions/auth.actions';
import { State } from 'src/app/reducers/auth.reducer';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
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

  public login(): void {
    const {email, password} = this.signin;

    if (email && password) {
      console.log("Signing in...");
      this.authService.login(email, password)
                .subscribe(
                    response => {
                        console.log("User is logged in");
                        this.store.dispatch(login({user: response.user}));
                        this.processing = false;
                        this.success = true;
                        this.router.navigateByUrl('/');
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
