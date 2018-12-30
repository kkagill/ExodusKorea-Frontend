import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { ConfigService } from '../utils/config.service';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  _baseUrl: string = '';
  _baseAuthUrl: string = '';

  constructor(private http: HttpClient,
    private router: Router,
    private configService: ConfigService) {
    this._baseUrl = this.configService.getApiURI();
    this._baseAuthUrl = this.configService.getAuthURI();
  }

  login(email: string, password: string): Observable<boolean> {
    const body = new HttpParams()
      .set('username', email)
      .set('password', password)
      .set('grant_type', "password")
      .set('scope', "offline_access");
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<any>(this._baseAuthUrl + 'connect/token', body, { headers })
      .pipe(
        map(res => {
          if (res) {
            this.setAccessToken(res.access_token);
            this.setRefreshToken(res.refresh_token);
            return true;
          }
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  refresh(): Observable<any> {
    const body = new HttpParams()
      .set('grant_type', "refresh_token")
      .set('scope', "offline_access")
      .set('refresh_token', this.getRefreshToken());
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<any>(this._baseAuthUrl + 'connect/token', body, { headers })
      .pipe(
        map(res => {
          if (res) {
            this.setAccessToken(res.access_token);
            return res;
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

  getProfile(): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.get(this._baseUrl + `account/profile`, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  changeNickName(nickName: string): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.put<any>(this._baseUrl + `account/${nickName}/change-nickName`, nickName, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  changePassword(body: any): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.post<any>(this._baseUrl + 'account/change-password', body, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  updateSubscription(hasCanceledSubscription: boolean): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.put<any>(this._baseUrl + `account/${hasCanceledSubscription}/update-subscription`, hasCanceledSubscription, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  deleteAccount(reason: string, password: string): Observable<any> {  
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }; 
    return this.http.delete<any>(this._baseUrl + `account/${reason}/${password}/delete-account`, { headers: header, observe: "response" })
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
    localStorage.removeItem('refresh_token');

    this.router.navigate(['logout']);
  }

  setAccessToken(accessToken: string) {
    if (!accessToken) {
      localStorage.removeItem('access_token');
    } else {
      localStorage.setItem('access_token', accessToken);
    }
  }

  setRefreshToken(refreshToken: string) {
    if (!refreshToken) {
      localStorage.removeItem('refresh_token');
    } else {
      localStorage.setItem('refresh_token', refreshToken);
    }
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  isAuthenticated() {
    return !!this.getAccessToken();
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(this.getAccessToken());
  }

  isTokenExpired() {
    const jwtHelper = new JwtHelperService();
    return jwtHelper.isTokenExpired(this.getAccessToken());
  }

  getUserId() {
    return this.decodeToken().sub;
  }

  getUserEmail() {
    return this.decodeToken().name;
  }

  // isAdmin() {
  //     return this.useJwtHelper().role == 'Admin' ? true : false;
  // }
}