import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BlogPostService } from "../service/blog-post.service";
import { BlogPost } from "../models/blog-post";
import { AuthService } from '../service/auth.service';
import { State } from '../reducers/auth.reducer';
import { BasicPageComponent } from '../basic-page/basic-page.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BasicPageComponent implements OnInit {
  userState$: Observable<State>;
  loading: boolean = true;
  posts: BlogPost[];

  constructor(private postService: BlogPostService, private router: Router,
      private authService: AuthService, private store: Store<{ userState: State }>) {
        super()
      }

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
