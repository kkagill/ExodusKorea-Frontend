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
  
  getAllNews(): Observable<any> {
    return this.http.get(this._baseUrl + `news/all-news`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getMainNews(): Observable<any> {
    return this.http.get(this._baseUrl + `news/main-news`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getRecommendedVideo(): Observable<any> {
    return this.http.get(this._baseUrl + `home/recommended-video`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getMainCurrencies(): Observable<any> {
    return this.http.get(this._baseUrl + `home/main-currencies`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getNewsDetail(newsDetailId: number): Observable<any> {
    return this.http.get(this._baseUrl + `news/${newsDetailId}/news-detail`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getNewsList(newsId: number): Observable<any> {
    return this.http.get(this._baseUrl + `news/${newsId}/news-list`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getVideoPosts(): Observable<any> {
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

  getVideosByCountry(country: string): Observable<any> {
    return this.http.get(this._baseUrl + `home/${country}/videos-by-country`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getCountryInfo(videoPostId: number): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${videoPostId}/country-info`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getSalaryInfo(videoPostId: number): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${videoPostId}/salary-info`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getPriceInfo(videoPostId: number): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${videoPostId}/price-info`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getPriceInfoDetail(country: string): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${country}/price-info-detail`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getMinimumCoLInfo(videoPostId: number): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${videoPostId}/minimum-col-info`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getMinimumCoLDetail(country: string): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${country}/minimum-col-detail`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getCitiesByCountry(country: string): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${country}/cities-by-country`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getCurrencyInfo(videoPostId: number): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${videoPostId}/currency-info`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getPostLikesCombined(videoPostId: number, videoId: string): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${videoPostId}/${videoId}/video-post-likes`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getVideoComments(videoPostId: number, videoId: string): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${videoPostId}/${videoId}/video-comments-combined`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getVideoComment(id: number): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${id}/video-comment`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getVideoCommentReply(id: number): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${id}/video-comment-reply`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getVideoPostLike(id: number): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.get(this._baseUrl + `carddetail/${id}/video-post-like`, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }    
  
  getNotificationsForUser(): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.get<any>(this._baseUrl + 'carddetail/notifications-for-user', { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  findUserLikedPost(id: number): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.get(this._baseUrl + `carddetail/${id}/video-post-like`, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }  

  findUserLikedComment(id: number): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.get(this._baseUrl + `carddetail/${id}/comment-like`, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }  

  findUserLikedCommentReply(id: number): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.get(this._baseUrl + `carddetail/${id}/comment-reply-like`, { headers: header, observe: "response" })
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

  addNewCommentReplyReply(body: any): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.post<any>(this._baseUrl + 'carddetail/add-comment-reply-reply', body, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  addNewNotification(body: any): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.post<any>(this._baseUrl + 'carddetail/add-notification', body, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  addPostLike(body: any): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.post<any>(this._baseUrl + 'carddetail/add-video-post-like', body, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  addCommentLike(body: any): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.post<any>(this._baseUrl + 'carddetail/add-comment-like', body, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  addCommentReplyLike(body: any): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.post<any>(this._baseUrl + 'carddetail/add-comment-reply-like', body, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  addMinimumCoL(body: any): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.post<any>(this._baseUrl + 'carddetail/add-minimum-col', body, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  updatePostLikes(id: number): Observable<any> {  
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }; 
    return this.http.put<any>(this._baseUrl + `carddetail/${id}/update-video-post-likes`, id, { headers: header, observe: "response" })
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

  updateCommentReplyLikes(id: number): Observable<any> {  
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }; 
    return this.http.put<any>(this._baseUrl + `carddetail/${id}/update-comment-reply-likes`, id, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  updateHasReadById(id: number): Observable<any> {  
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }; 
    return this.http.put<any>(this._baseUrl + `carddetail/${id}/update-has-read`, id, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  deleteComment(id: number): Observable<any> {  
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }; 
    return this.http.delete<any>(this._baseUrl + `carddetail/${id}/delete-video-comment`, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  deleteCommentReply(id: number): Observable<any> {  
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }; 
    return this.http.delete<any>(this._baseUrl + `carddetail/${id}/delete-video-comment-reply`, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }
}