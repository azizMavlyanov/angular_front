import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ApiService } from './api.service';

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) {}

  public UpdateUser(user: User): Observable<any> {
    return this.apiService.Update(`${environment.api.userEntries}/${user.id}`, user);
  }
}
