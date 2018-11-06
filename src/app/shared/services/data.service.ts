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

  getCountryInfo(newVideoId: number): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${newVideoId}/country-info`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getPriceInfo(newVideoId: number): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${newVideoId}/price-info`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getCurrencyInfo(newVideoId: number): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${newVideoId}/currency-info`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getYouTubeLikes(videoId: string): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${videoId}/youtube-likes`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getVideoComments(newVideoId: number, videoId: string): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${newVideoId}/${videoId}/video-comments-combined`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  addNewComment(body: any): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.post<any>(this._baseUrl + 'carddetail/add-comment', body, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  addNewCommentReply(body: any): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.post<any>(this._baseUrl + 'carddetail/add-comment-reply', body, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  updateCommentLikes(id: number): Observable<any> {  
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }; 
    return this.http.put<any>(this._baseUrl + `carddetail/${id}/update-comment-likes`, id, { headers: header, observe: "response" })
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