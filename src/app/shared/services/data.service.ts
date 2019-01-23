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

  getCareerInfo(videoPostId: number): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${videoPostId}/career-info`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getJobSites(videoPostId: number): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${videoPostId}/job-sites`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getCurrency(): Observable<any> {
    return this.http.get(this._baseUrl + `home/currency`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getAllSearchVideoCategories(): Observable<any> {
    return this.http.get(this._baseUrl + `searchvideo/all-categories`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getAllCareers(): Observable<any> {
    return this.http.get(this._baseUrl + `searchvideo/all-careers`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getAllCountries(): Observable<any> {
    return this.http.get(this._baseUrl + `searchvideo/all-countries`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getAllSearchResult(): Observable<any> {
    return this.http.get(this._baseUrl + `searchvideo/all-search-result`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getSearchResultByCategory(categoryId: number): Observable<any> {
    return this.http.get(this._baseUrl + `searchvideo/${categoryId}/search-result-category`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }


  getSearchResultByCareer(careerId: number): Observable<any> {
    return this.http.get(this._baseUrl + `searchvideo/${careerId}/search-result-career`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getCountryInfoCanada(): Observable<any> {
    return this.http.get(this._baseUrl + `countryinfo/country-info-canada`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getAllCategories(): Observable<any> {
    return this.http.get(this._baseUrl + `news/all-categories`, { observe: "response" })
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

  getPopularNews(): Observable<any> {
    return this.http.get(this._baseUrl + `news/popular-news`, { observe: "response" })
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

  getAllVideos(): Observable<any> {
    return this.http.get(this._baseUrl + `home/all-videos`, { observe: "response" })
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

  getCitiesByCountryId(countryId: number): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${countryId}/cities-by-country`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getCategoryCountryUploader(): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.get(this._baseUrl + `admin/categories-countries-uploaders`, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getYouTubeInfoById(youTubeId: string): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.get(this._baseUrl + `admin/${youTubeId}/youtube-info-by-id`, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getChannelInfoById(channelId: string): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.get(this._baseUrl + `admin/${channelId}/channel-info-by-id`, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getSalaryInfoOccupations(country: string): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.get(this._baseUrl + `admin/${country}/salary-info-occupations`, { headers: header, observe: "response" })
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

  getPostInfo(videoPostId: number, videoId: string, vimeoId: number): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${videoPostId}/${videoId}/${vimeoId}/video-post-info`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getVideoComments(videoPostId: number, videoId: string, vimeoId: number): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${videoPostId}/${videoId}/${vimeoId}/video-comments-combined`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getYouTubeReplies(parentId: string): Observable<any> {
    return this.http.get(this._baseUrl + `carddetail/${parentId}/youtube-replies`, { observe: "response" })
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

  getMyVideos(): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.get(this._baseUrl + `carddetail/my-videos`, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getAllPromisingFields(): Observable<any> {
    return this.http.get(this._baseUrl + `countryinfo/promising-fields`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getAllSettlementGuides(): Observable<any> {
    return this.http.get(this._baseUrl + `countryinfo/settlement-guides`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getAllLivingConditions(): Observable<any> {
    return this.http.get(this._baseUrl + `countryinfo/living-conditions`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getAllImmigrationVisa(): Observable<any> {
    return this.http.get(this._baseUrl + `countryinfo/immigration-visas`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getUploaderRanking(): Observable<any> {
    return this.http.get(this._baseUrl + `ranking/uploader-ranking`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getUploaderVideos(uploaderId: number): Observable<any> {
    return this.http.get(this._baseUrl + `ranking/${uploaderId}/uploader-videos`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getJobsInDemandVideos(jobsInDemandId: number): Observable<any> {
    return this.http.get(this._baseUrl + `ranking/${jobsInDemandId}/jobsindemand-videos`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getJobsInDemandByRandomCountries(): Observable<any> {
    return this.http.get(this._baseUrl + `ranking/jobsindemand-random-countries`, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getJobsInDemandByAllCountries(): Observable<any> {
    return this.http.get(this._baseUrl + `ranking/jobsindemand-all-countries`, { observe: "response" })
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

  logHttpResponseException(body: any): Observable<any> {
    return this.http.post<any>(this._baseUrl + 'httpresponse/log-http-response', body, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  logLoggedInHttpResponseException(body: any): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.post<any>(this._baseUrl + 'httpresponse/log-loggedin-http-response', body, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  addNewVideoPost(body: any): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.post<any>(this._baseUrl + 'admin/add-new-video', body, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  addNewSalaryInfo(body: any): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.post<any>(this._baseUrl + 'admin/add-new-salary-info', body, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  addNewUploader(body: any): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.post<any>(this._baseUrl + 'admin/add-new-uploader', body, { headers: header, observe: "response" })
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

  addToMyVideos(body: any): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.post<any>(this._baseUrl + `carddetail/add-my-videos`, body, { headers: header, observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  uploadVideo(body: any): Observable<any> {
    return this.http.post<any>(this._baseUrl + 'uploadvideo/upload-video', body, { observe: "response" })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  updateNewsViewsCount(newsDetailId: number): Observable<any> {
    return this.http.put<any>(this._baseUrl + `news/${newsDetailId}/update-views-count`, newsDetailId, { observe: "response" })
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

  disableVideoPost(videoPostId: number): Observable<any> {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
    return this.http.delete<any>(this._baseUrl + `admin/${videoPostId}/disable-video`, { headers: header, observe: "response" })
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