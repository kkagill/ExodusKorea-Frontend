import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../utils/config.service';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable()
export class DataService {
  _baseUrl: string = '';

  constructor(private http: HttpClient,
    private configService: ConfigService) {
    this._baseUrl = this.configService.getApiURI();
  }

  getNewVideos(): Observable<any> {
    return this.http.get(this._baseUrl + `home/new-videos`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getCountryInfo(videoId: string): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${videoId}/country-info`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getPriceInfo(videoId: string): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${videoId}/price-info`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getCurrencyInfo(videoId: string): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${videoId}/currency-info`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getYouTubeComments(videoId: string): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${videoId}/youtube-comments`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getAdmin(): Observable<number[]> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.get<number[]>(this._baseUrl + 'admin', { headers: header })
      .pipe(
        map(data => {
          return data;
        }),
        tap(data => console.log(data))
      )
  }
}