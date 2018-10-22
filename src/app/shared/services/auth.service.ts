import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, tap, catchError } from 'rxjs/operators';
import { ConfigService } from '../utils/config.service';
import { throwError } from 'rxjs';
 
@Injectable()
export class AuthService {
    _baseUrl: string = '';
    _baseAuthUrl: string = '';

    constructor(private http: HttpClient,
                private configService: ConfigService) 
    {
        this._baseUrl = this.configService.getApiURI();
        this._baseAuthUrl = this.configService.getAuthURI();
    }  
 
    login(email: string, password: string): Observable<boolean> {
        const body = `username=${email}&password=${password}&grant_type=password`;
        const header = {'Content-Type': 'application/x-www-form-urlencoded'};

        return this.http.post<any>(this._baseAuthUrl + 'connect/token', body, { headers: header })
            .pipe(
                map(res => {                    
                    if (res && res.access_token) {
                        localStorage.setItem('access_token', res.access_token);                 
                        return true;
                    }       
                }),
                catchError(err => {
                    return throwError(err);                    
                })
            );
    }    

    forgotPassword(body: any): Observable<any> {   
        return this.http.post<any>(this._baseUrl + 'account/forgot-password', body, { observe: "response" })
            .pipe(
                map(res => {  
                    return res;                                   
                }),
                catchError(err => {
                    return throwError(err);                    
                })
            );
    } 

    getReCaptchaResponse(body: any): Observable<any> {   
        return this.http.post<any>(this._baseUrl + 'account/recaptcha', body, { observe: "response" })
            .pipe(
                map(res => {  
                    return res;                                   
                }),
                catchError(err => {
                    return throwError(err);                    
                })
            );
    } 

    register(body: any): Observable<any> {   
        return this.http.post<any>(this._baseUrl + 'account/register', body, { observe: "response" })
            .pipe(
                map(res => {  
                    return res;                                   
                }),
                catchError(err => {
                    return throwError(err);                    
                })
            );
    }    

    resend(email: string): Observable<any> {   
        return this.http.get(this._baseUrl + `account/${email}/resend`, { observe: "response" })
            .pipe(
                map(res => {  
                    return res;                                   
                }),
                catchError(err => {
                    return throwError(err);                    
                })
            );
    }    

    logout() {
        localStorage.removeItem('access_token');
    } 
    
    isAuthenticated() {
        return !!localStorage.getItem('access_token');
    }

    // useJwtHelper() {
    //     var token = sessionStorage.getItem('bearer_token');
    //     //this.jwtHelper.getTokenExpirationDate(token),
    //     //this.jwtHelper.isTokenExpired(token)       
    //     return this.jwtHelper.decodeToken(token);       
    // }

    // isAdmin() {
    //     return this.useJwtHelper().role == 'Admin' ? true : false;
    // }

    // getUserName() {
    //     return this.useJwtHelper().name;
    // }

    // getUserId() {
    //     return this.useJwtHelper().sub;
    // }
}