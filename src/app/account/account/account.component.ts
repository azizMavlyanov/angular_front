import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BlogPost } from 'src/app/models/blog-post';
import { Photo } from 'src/app/models/photo';
import { User } from 'src/app/models/user';
import { State } from 'src/app/reducers/auth.reducer';
import { BlogPostService } from 'src/app/service/blog-post.service';
import { UploadService } from 'src/app/service/upload.service';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment';
import {login, logout} from '../../actions/auth.actions';

const API_URL = environment.api.base;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class AccountComponent implements OnInit {
  userState$: Observable<State>;
  loading: boolean = true;
  posts: BlogPost[];
  inputUserName: string;
  name: string;
  email: string;
  userId: number;
  user_photo: string;
  fileToUpload: File = null;

  public processing: boolean = false;
  public submitted: boolean = false;
  public success: boolean = false;
  public failure: boolean = false;

  constructor(private postService: BlogPostService,
    private router: Router,
    private uploadService: UploadService,
    private userService: UserService,
    private store: Store<{userState: State}>) { }

  ngOnInit(): void {
    this.userState$ = this.store.select('userState');
    this.userState$.subscribe(state => {
      this.name = state.user.name;
      this.email = state.user.email;
      this.userId = state.user.id;
      this.user_photo = API_URL + state.user.photo.image_path;
    });
    this.getPosts();
  }

  private getPosts(): void {
    this.postService.GetPostsByUserId(this.userId).subscribe(posts => {
      this.posts = posts;
      this.loading = false;
    });
  }

  public handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  public uploadFileToActivity() {
    console.log("Photo uploading...");
    if (this.fileToUpload) {
      this.uploadService.Upload(this.fileToUpload).subscribe(data => {
        const user = new User();
        const emptyPhoto = new Photo();
        user.photo = emptyPhoto;
        const {photo} = data;
        user.id = this.userId;
        user.name = this.name;
        user.photo.id = photo.id;
        console.log("User photo updating...");
        this.userService.UpdateUser(user).subscribe(data => {
          this.store.dispatch(login({user: data.user}));
          console.log("User photo updated");
          this.processing = false;
          this.success = true;
          this.router.navigateByUrl("/account");
        }, error => {
            console.log(error.status);
            this.processing = false;
            this.failure = true;
        });
      }, error => {
        console.log(error.status);
        this.processing = false;
        this.failure = true;
      });
  }
    else {
      const user = new User();
      user.id = this.userId;
      user.name = this.name;
      this.userService.UpdateUser(user).subscribe(data => {
        this.store.dispatch(login({user: data.user}));
        console.log("User photo updated");
        this.processing = false;
        this.success = true;
        this.router.navigateByUrl("/account");
      }, error => {
          console.log(error.status);
          this.processing = false;
          this.failure = true;
      });
    }

  }

}