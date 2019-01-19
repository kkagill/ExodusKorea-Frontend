import { AuthService } from './../../shared/services/auth.service';
import { IVideoPost, INewsDetail, ICurrencyInfo } from './../../shared/interfaces';
import { ItemsService } from './../../shared/utils/items.service';
import { DataService } from './../../shared/services/data.service';
import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  mainNews: INewsDetail[];
  recommendedVideo: IVideoPost;
  currencyInfo: ICurrencyInfo;
  allVideos: IVideoPost[];
  initial = [{}, {}];
  slides: any = [[]];
  backgroundUrl = '../../../assets/images/countries/';
  isNewsLoaded: boolean = false;
  isRecommendedVideoLoaded: boolean = false;
  isCurrencyLoaded: boolean = false;
  isNewVideosLoaded: boolean = false;
  isAllVideosLoaded: boolean = false;
  today: string;
  email: string;
  password: string;

  public constructor(private router: Router,
    private authService: AuthService,
    private datePipe: DatePipe,
    //private renderer: Renderer2,
    public snackBar: MatSnackBar,
    private dataSharingService: DataSharingService,
    public dialog: MatDialog,
    private dataService: DataService,
    private itemService: ItemsService) {
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.loadMainNews();
    this.loadRecommendedVideo();
    this.loadCurrency();
    this.loadNewVideos();
    this.loadAllVideos();
    //this.slides = this.chunk(this.initial, 1); // 진짜 미스테리.. loadNewVideoPosts에서도 this.slides 대입하고 여기서도 이런식으로해야 비로소 ngAfterViewInit이 작동한다..
  }

  // ngAfterViewInit() {
  //   let controls = document.querySelector('.controls-top');
  //   this.renderer.setStyle(controls.children[0], 'position', 'absolute');
  //   this.renderer.setStyle(controls.children[0], 'top', '-30%');
  //   this.renderer.setStyle(controls.children[0], 'right', '5%');
  //   this.renderer.setStyle(controls.children[1], 'position', 'absolute');
  //   this.renderer.setStyle(controls.children[1], 'top', '-30%');
  //   this.renderer.setStyle(controls.children[1], 'left', '94%');
  // }

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
          this.snackBar.open('정보를 불러오는 과정에서 오류가 났습니다.', '', {
            duration: 5000,
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
          this.snackBar.open('정보를 불러오는 과정에서 오류가 났습니다.', '', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  loadCurrency() {
    this.dataService.getCurrency()
      .subscribe(res => {
        if (res.status === 200) {
          this.isCurrencyLoaded = true;
          this.currencyInfo = this.itemService.getSerialized<ICurrencyInfo>(res.body);
        }
      },
        error => {
          this.snackBar.open('정보를 불러오는 과정에서 오류가 났습니다.', '', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  loadNewVideos() {
    this.dataService.getVideoPosts()
      .subscribe(res => {
        if (res.status === 200) {
          this.isNewVideosLoaded = true;
          let newVideoPosts = this.itemService.getSerialized<IVideoPost[]>(res.body);
          this.slides = this.chunk(newVideoPosts, 4);
        }
      },
        error => {
          this.snackBar.open('정보를 불러오는 과정에서 오류가 났습니다.', '', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  loadAllVideos() {
    this.dataService.getAllVideos()
      .subscribe(res => {
        if (res.status === 200) {
          this.isAllVideosLoaded = true;
          this.allVideos = this.itemService.getSerialized<IVideoPost[]>(res.body);
        }
      },
        error => {
          this.snackBar.open('정보를 불러오는 과정에서 오류가 났습니다.', '', {
            duration: 5000,
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

  onMatCardClick(videoPostId: number, videoId: string, isGoogleDriveVideo: number) {
    if (isGoogleDriveVideo === 1 && !this.authService.isAuthenticated()) {
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '410px',
        data: { email: this.email, password: this.password }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (this.authService.isAuthenticated()) {
          this.dataSharingService.loggedIn.next(true); // pass data to header.component.ts
        }
      });
    } else {
      this.router.navigate(['content-details', videoPostId, videoId, isGoogleDriveVideo]);
    }
  }

  onNewsDetailClick(newsDetailId: number, newsId: number) {
    this.router.navigate(['news-detail', newsDetailId, newsId, 0]);
  }

  onMoreNewsClick() {
    this.router.navigate(['news']);
  }

  onViewMoreClick() {
    this.router.navigate(['search-videos']);
  }
}