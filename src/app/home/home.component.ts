import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BlogPostService } from "../service/blog-post.service";
import { BlogPost } from "../models/blog-post";
import { AuthService } from '../service/auth.service';
import { State } from '../reducers/auth.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userState$: Observable<State>;
  loading: boolean = true;
  posts: BlogPost[];

  constructor(private postService: BlogPostService, private router: Router,
      private authService: AuthService, private store: Store<{ userState: State }>) {}

  ngOnInit(): void {
    this.getPosts();
    this.userState$ = this.store.select('userState');
  }

  private getPosts(): void {
    this.postService.GetPosts().subscribe(posts => {
      this.posts = posts;
      this.loading = false;
    });
  }

  private createPost(): void {
      console.log("Checking a user for being loged in");
      this.userState$.subscribe(state => {
        if (state.isLoggedIn) {
          this.router.navigateByUrl('/author-post');
        } else {
          console.log("Redirecting to login page");
          this.router.navigateByUrl('/login');
        }
      });
      
  }

}
