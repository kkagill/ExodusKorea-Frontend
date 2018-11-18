import { IVideoPost } from './../../shared/interfaces';
import { ItemsService } from './../../shared/utils/items.service';
import { DataService } from './../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allVideoPosts: IVideoPost[];
  videosUSA: IVideoPost[];
  videosCanada: IVideoPost[];
  videosAustralia: IVideoPost[];
  slides: any = [[]];
  backgroundUrl = '../../../assets/images/countries/';
  isVideoPostLoaded: boolean = false;
  isUSALoaded: boolean = false;
  isCanadaLoaded: boolean = false;
  isAustraliaLoaded: boolean = false;

  public constructor(private router: Router,
    public http: HttpClient,
    public snackBar: MatSnackBar,
    private dataService: DataService,
    private itemService: ItemsService) { }

  ngOnInit() {
    this.loadNewVideoPosts();
    this.loadUSAVideoPosts();
    this.loadCanadaVideoPosts();
    this.loadAustraliaVideoPosts();
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
        this.snackBar.open('오류가 났습니다. 페이지를 새로고침하고 다시 시도해주세요. 오류가 지속될시 admin@exodusKorea.com으로 연락주시기 바랍니다.', '', {
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
        this.snackBar.open('오류가 났습니다. 페이지를 새로고침하고 다시 시도해주세요. 오류가 지속될시 admin@exodusKorea.com으로 연락주시기 바랍니다.', '', {
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
        this.snackBar.open('오류가 났습니다. 페이지를 새로고침하고 다시 시도해주세요. 오류가 지속될시 admin@exodusKorea.com으로 연락주시기 바랍니다.', '', {
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
        this.snackBar.open('오류가 났습니다. 페이지를 새로고침하고 다시 시도해주세요. 오류가 지속될시 admin@exodusKorea.com으로 연락주시기 바랍니다.', '', {
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

  // public isLoggedIn(): boolean {
  //   return this.authService.isAuthenticated();
  // }

  onMatCardClick(videoPostId, videoId) {
    this.router.navigate(['content-details', videoPostId, videoId]);
  }
}