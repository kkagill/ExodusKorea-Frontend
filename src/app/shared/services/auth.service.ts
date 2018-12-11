import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { ConfigService } from '../utils/config.service';
import { throwError } from 'rxjs';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
  _baseUrl: string = '';
  _baseAuthUrl: string = '';

  constructor(private http: HttpClient,
    private configService: ConfigService) {
    this._baseUrl = this.configService.getApiURI();
    this._baseAuthUrl = this.configService.getAuthURI();
  }

  jwtHelper: JwtHelper = new JwtHelper(); 

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

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
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
    return this.jwtHelper.decodeToken(this.getAccessToken());
  }

  isTokenExpired() {
    return this.jwtHelper.isTokenExpired(this.getAccessToken());
  }

  getUserId() {
    return this.decodeToken().sub;
  }

  // isAdmin() {
  //     return this.useJwtHelper().role == 'Admin' ? true : false;
  // }
}