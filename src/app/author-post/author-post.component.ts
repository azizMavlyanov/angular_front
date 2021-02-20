import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { BlogPostService } from "../service/blog-post.service";
import { BlogPostRequest } from '../models/blog-post-request';
import { Observable } from 'rxjs';
import { State } from '../reducers/auth.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-author-post',
  templateUrl: './author-post.component.html',
  styleUrls: ['./author-post.component.css']
})
export class AuthorPostComponent implements OnInit {
  userState$: Observable<State>;
  public post: BlogPostRequest;
  public processing: boolean = false;
  public submitted: boolean = false;
  public success: boolean = false;
  public failure: boolean = false;

  constructor(private postService: BlogPostService,
    private store: Store<{userState: State}>) {
    }

  ngOnInit(): void {
    this.userState$ = this.store.select('userState');
    this.post = new BlogPostRequest();
    this.userState$.subscribe(state => {
      this.post.user_id = state.user.id;
    });
    this.post.version = 1;
  }

  public submit(): void {
    this.processing = this.submitted = true;

    console.log("submitting blog post: " + JSON.stringify(this.post));

    this.postService.CreatePost(this.post).subscribe(
      // response => console.log('response on new post: ' + JSON.stringify(response))
      response => {
        // Handle each observable response
        console.log("result: " + response);
        this.processing = false;
      },
      error => {
        //error response code
        this.processing = false;
        this.failure = true;
      },
      () => {
        //success response code
        this.processing = false;
        this.success = true;
      }
    );
  }

}
