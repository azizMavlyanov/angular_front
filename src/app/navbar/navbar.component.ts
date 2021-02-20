import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Store } from '@ngrx/store';
import {login, logout} from '../actions/auth.actions';
import { Observable } from 'rxjs';
import { State } from '../reducers/auth.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  userState$: Observable<State>;

  constructor(private router: Router, private authService: AuthService,
    private store: Store<{userState: State}>) { }

  ngOnInit(): void {
    this.userState$ = this.store.select('userState');
    this.userState$.subscribe(state => {
      this.isLoggedIn = state.isLoggedIn;
    })
  }

  private logout(): void {
    console.log("Logging out...")
    this.authService.logout();
    this.store.dispatch(logout());
    this.router.navigateByUrl('/');
  }
}
