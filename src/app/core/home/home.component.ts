import { IVideoPost, INewsDetail, IMainCurrencies } from './../../shared/interfaces';
import { ItemsService } from './../../shared/utils/items.service';
import { DataService } from './../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  mainNews: INewsDetail[];
  recommendedVideo: IVideoPost;
  mainCurrencies: IMainCurrencies;
  allVideoPosts: IVideoPost[];
  videosUSA: IVideoPost[];
  videosCanada: IVideoPost[];
  videosAustralia: IVideoPost[];
  slides: any = [[]];
  backgroundUrl = '../../../assets/images/countries/';
  isNewsLoaded: boolean = false;
  isRecommendedVideoLoaded: boolean = false;
  isMainCurrenciesLoaded: boolean = false;
  isVideoPostLoaded: boolean = false;
  isUSALoaded: boolean = false;
  isCanadaLoaded: boolean = false;
  isAustraliaLoaded: boolean = false;  
  today: string;

  public constructor(private router: Router,
    private datePipe: DatePipe,
    public snackBar: MatSnackBar,
    private dataService: DataService,
    private itemService: ItemsService) {
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.loadMainNews();
    this.loadRecommendedVideo();
    this.loadMainCurrencies();
    this.loadNewVideoPosts();
    this.loadUSAVideoPosts();
    this.loadCanadaVideoPosts();
    this.loadAustraliaVideoPosts();
  }

  loadMainNews() {
    this.dataService.getMainNews()
      .subscribe(res => {
        if (res.status === 200) {
          this.isNewsLoaded = true;
          this.mainNews = this.itemService.getSerialized<INewsDetail[]>(res.body);
          for (let mn of this.mainNews) {
            mn.createdDate = this.datePipe.transform(mn.dateCreated, 'yyyy-MM-dd');
          }
        }
      },
        error => {
          this.snackBar.open('오류가 났습니다. 페이지를 새로고침하고 다시 시도해주세요. 오류가 지속될시 admin@exoduscorea.com으로 연락주시기 바랍니다.', '', {
            duration: 60000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  loadRecommendedVideo() {
    this.dataService.getRecommendedVideo()
      .subscribe(res => {
        if (res.status === 200) {
          this.isRecommendedVideoLoaded = true;
          this.recommendedVideo = this.itemService.getSerialized<IVideoPost>(res.body);         
        }
      },
        error => {
          this.snackBar.open('오류가 났습니다. 페이지를 새로고침하고 다시 시도해주세요. 오류가 지속될시 admin@exoduscorea.com으로 연락주시기 바랍니다.', '', {
            duration: 60000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  loadMainCurrencies() {
    this.dataService.getMainCurrencies()
      .subscribe(res => {
        if (res.status === 200) {
          this.isMainCurrenciesLoaded = true;
          this.mainCurrencies = this.itemService.getSerialized<IMainCurrencies>(res.body);      
        }
      },
        error => {
          this.snackBar.open('오류가 났습니다. 페이지를 새로고침하고 다시 시도해주세요. 오류가 지속될시 admin@exoduscorea.com으로 연락주시기 바랍니다.', '', {
            duration: 60000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  loadNewVideoPosts() {
    this.dataService.getVideoPosts()
      .subscribe(res => {
        if (res.status === 200) {
          this.isVideoPostLoaded = true;
          this.allVideoPosts = this.itemService.getSerialized<IVideoPost[]>(res.body);
          this.slides = this.chunk(this.allVideoPosts, 4);
        }
      },
        error => {
          this.snackBar.open('오류가 났습니다. 페이지를 새로고침하고 다시 시도해주세요. 오류가 지속될시 admin@exoduscorea.com으로 연락주시기 바랍니다.', '', {
            duration: 60000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  loadUSAVideoPosts() {
    this.dataService.getVideosByCountry("unitedstates")
      .subscribe(res => {
        if (res.status === 200) {
          this.isUSALoaded = true;
          this.videosUSA = this.itemService.getSerialized<IVideoPost[]>(res.body);
        }
      },
        error => {
          this.snackBar.open('오류가 났습니다. 페이지를 새로고침하고 다시 시도해주세요. 오류가 지속될시 admin@exoduscorea.com으로 연락주시기 바랍니다.', '', {
            duration: 60000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  loadCanadaVideoPosts() {
    this.dataService.getVideosByCountry("canada")
      .subscribe(res => {
        if (res.status === 200) {
          this.isCanadaLoaded = true;
          this.videosCanada = this.itemService.getSerialized<IVideoPost[]>(res.body);
        }
      },
        error => {
          this.snackBar.open('오류가 났습니다. 페이지를 새로고침하고 다시 시도해주세요. 오류가 지속될시 admin@exoduscorea.com으로 연락주시기 바랍니다.', '', {
            duration: 60000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  loadAustraliaVideoPosts() {
    this.dataService.getVideosByCountry("australia")
      .subscribe(res => {
        if (res.status === 200) {
          this.isAustraliaLoaded = true;
          this.videosAustralia = this.itemService.getSerialized<IVideoPost[]>(res.body);
        }
      },
        error => {
          this.snackBar.open('오류가 났습니다. 페이지를 새로고침하고 다시 시도해주세요. 오류가 지속될시 admin@exoduscorea.com으로 연락주시기 바랍니다.', '', {
            duration: 60000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  } 

  onMatCardClick(videoPostId, videoId) {
    this.router.navigate(['content-details', videoPostId, videoId]);
  }

  onNewsDetailClick(newsDetailId: number, newsId: number) {
    this.router.navigate(['news-detail', newsDetailId, newsId, 0]);
  }

  onMoreNewsClick() {
    this.router.navigate(['news']);
  }
}