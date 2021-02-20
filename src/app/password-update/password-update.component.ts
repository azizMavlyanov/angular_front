import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UpdatePassword } from '../models/update-password';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css']
})
export class PasswordUpdateComponent implements OnInit {
  email: string;
  public updatePassword: UpdatePassword;
  public processing: boolean = false;
  public submitted: boolean = false;
  public success: boolean = false;
  public failure: boolean = false;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.updatePassword = new UpdatePassword();
    this.email = this.route.snapshot.paramMap.get("email");
    this.updatePassword.email = this.email;
  }

  public submit(): void {
    const {token, email, password, password_confirmation} = this.updatePassword;
    console.log("Password updating...");
    this.authService.updatePassword({token, email, password, password_confirmation})
        .subscribe(
          () => {
              console.log("Password successfully reset");
              this.processing = false;
              this.success = true;
              this.router.navigateByUrl('/login');
          },
          error => {
            console.log(`Some error occured ${error.status}`);
            this.processing = false;
            this.failure = true;
          }
        );
  }

}
