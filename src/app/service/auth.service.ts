import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as moment from "moment";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiService } from "./api.service";
import { map, catchError } from "rxjs/operators";
import { SignUp } from "../models/signup";

@Injectable({
    providedIn: 'root'
  })
export class AuthService {
    constructor(private apiService: ApiService) {}

    register({name, email, password, password_confirmation}): Observable<any> {
        return this.apiService.Post(environment.api.authPrefix + environment.api.registration, {name, email, password, password_confirmation});
    }

    login(email: string, password: string): Observable<any> {
        return this.apiService.Post(environment.api.authPrefix + environment.api.login, {email, password})
                    .pipe(
                        map(json => {
                            this.setSession(json)
                            return json;
                        })
                        );
    }

    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expires_in,'second');

        localStorage.setItem('access_token', authResult.access_token);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }

    logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
    
    public resetPassword(email: String): Observable<any> {
        return this.apiService.Post('forgot-password', {email}) // forgot-password endpoint is from backend rest api
                    .pipe(
                        map(json => {
                                        return json;
                                    })
                        );
    }

    updatePassword({token, email, password, password_confirmation}): Observable<any> {
        return  this.apiService.Post('reset-password', {token, email, password, password_confirmation}) // reset-password endpoint is from backend rest api
                    .pipe(
                        map(json => {
                                        return json;
                                    })
                        );
    }

}