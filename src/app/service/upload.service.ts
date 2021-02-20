import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private apiService: ApiService) { }

  public Upload(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image_file', fileToUpload, fileToUpload.name);
    return this.apiService.Post(environment.api.photoEntries, formData);
  }
}
