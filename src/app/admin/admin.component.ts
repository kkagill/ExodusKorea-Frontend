import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DataSharingService } from '../shared/services/data-sharing.service';
import { AuthService } from '../shared/services/auth.service';
import { ItemsService } from '../shared/utils/items.service';
import { DataService } from '../shared/services/data.service';
import { ISalaryInfo, IUploader, IVideoPostInfo, IVideoPost, ICategoryCountryCareerUploader } from '../shared/interfaces';
import { LoginComponent } from '../auth/login/login.component';
import { NgForm, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AddSalaryInfoDialog } from './dialogs/add-salary-info-dialog/add-salary-info-dialog.component';
import { AddUploaderDialog } from './dialogs/add-uploader-dialog/add-uploader-dialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  categories: Array<any> = [];
  countries: Array<any> = [];
  careers: Array<any> = [];
  videoPosts: Array<any> = [];
  countriesForSalary: Array<any> = [];
  occupations: Array<any> = [];
  isChecked: boolean = false;
  isGDVChecked: boolean = false;
  isDDLLoaded: boolean = false;
  isCountriesLoaded: boolean = false;
  isOccupationsLoaded: boolean = false;
  isYouTubeInfoLoaded: boolean = false;
  isVideoPostsLoaded: boolean = false;
  isSubmitted: boolean = false;
  isYouTubeSubmitted: boolean = false;
  isLinkSubmitted: boolean = false;
  email: string;
  password: string;
  model: any = {};
  uploaders: IUploader[] = [];
  uploaderControl = new FormControl();
  filteredUploaders: Observable<IUploader[]>;

  constructor(private dataService: DataService,
    private itemsService: ItemsService,
    private authService: AuthService,
    private dataSharingService: DataSharingService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) {
    this.dataSharingService.uploaderAdded.subscribe(flag => {
      if (flag) {
        this.refreshUploaders();
      }
    });
  }

  ngOnInit() {
    this.loadAllDDLInfo();
    this.onLoadCountries();
    this.loadAllVideoPosts();
  }

  loadAllDDLInfo() {
    this.dataService.getCategoryCountryCareerUploader()
      .subscribe(res => {
        if (res.status === 200) {
          this.isDDLLoaded = true;
          let result = this.itemsService.getSerialized<ICategoryCountryCareerUploader>(res.body);

          for (let c of result.categories) {
            if (c.categoryId !== 1) {
              this.categories.push({ value: c.categoryId, label: c.name });
            }
          }
          for (let c of result.countries) {
            this.countries.push({ value: c.countryId, label: c.nameKR });
          }
          for (let c of result.careers) {
            this.careers.push({ value: c.careerId, label: c.name });
          }
          for (let u of result.uploaders) {
            this.uploaders.push({ uploaderId: u.uploaderId, name: u.name });
          }

          this.filteredUploaders = this.uploaderControl.valueChanges
            .pipe(
              startWith(''),
              map(u => u ? this._filterUploaders(u) : result.uploaders.slice())
            );
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

  refreshUploaders() {
    this.dataService.getCategoryCountryCareerUploader()
      .subscribe(res => {
        if (res.status === 200) {
          this.isDDLLoaded = true;
          let result = this.itemsService.getSerialized<ICategoryCountryCareerUploader>(res.body);

          for (let u of result.uploaders) {
            this.uploaders.push({ uploaderId: u.uploaderId, name: u.name });
          }

          this.filteredUploaders = this.uploaderControl.valueChanges
            .pipe(
              startWith(''),
              map(u => u ? this._filterUploaders(u) : result.uploaders.slice())
            );
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

  loadAllVideoPosts() {
    this.dataService.getAllSearchResult()
      .subscribe(res => {
        if (res.status === 200) {
          this.isVideoPostsLoaded = true;
          let result = this.itemsService.getSerialized<IVideoPost[]>(res.body);
          for (let vp of result) {
            this.videoPosts.push({ value: vp.videoPostId, label: vp.videoPostId + " " + vp.youTubeVideoId });
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

  onFindYouTubeInfo(youtubeId: any) {
    this.isYouTubeSubmitted = true;
    this.dataService.getYouTubeInfoById(youtubeId)
      .subscribe(res => {
        if (res.status === 200) {
          this.isYouTubeInfoLoaded = true;
          this.isYouTubeSubmitted = false;
          let result = this.itemsService.getSerialized<IVideoPostInfo>(res.body);
          this.model.likes = result.likes;
          this.model.subject = result.title;
          this.model.uploader = result.owner;
          this.model.channelId = result.channelId;
        }
      },
        error => {
          this.isYouTubeSubmitted = false;
          this.snackBar.open('정보를 불러오는 과정에서 오류가 났습니다.', '', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  onSubmit(value: any) {
    if (!this.authService.isAuthenticated() || !this.authService.isAdmin()) {
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '410px',
        data: { email: this.email, password: this.password }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (this.authService.isAuthenticated() && this.authService.isAdmin()) {
          this.dataSharingService.loggedIn.next(true); // pass data to header.component.ts
        }
      });
      return;
    }

    this.isSubmitted = true;
    let uploaderId = 0;

    for (let u of this.uploaders) {
      if (u.name === this.uploaderControl.value) {
        uploaderId = u.uploaderId;
      }
    }

    if (uploaderId === 0) {
      alert("UploaderId error");
      return;
    } else if (this.model.likes === undefined) {
      alert("likes is undefined");
      return;
    }

    let body = {
      'categoryId': value.categoryId,
      'countryId': value.countryId,
      'careerId': value.careerId,
      'uploaderId': uploaderId,
      'salaryInfoId': value.salaryInfoId,
      'likes': this.isGDVChecked ? 10 : this.model.likes, // If it's google drive video, give 10 likes in advance
      'title': value.title,
      'youTubeVideoId': value.youTubeVideoId,
      'sharerId': value.sharerId,
      'isGoogleDriveVideo': this.isGDVChecked
    };

    this.dataService.addNewVideoPost(body)
      .subscribe(res => {
        if (res.status === 201) {
          this.isSubmitted = false;
          this.form.reset()
          this.uploaderControl.reset();
          this.isYouTubeInfoLoaded = false;

          setTimeout(() => {
            this.snackBar.open('추가되었습니다.', '', {
              duration: 2000,
              panelClass: ['green-snackbar']
            });
          }, 500);
        }
      },
        error => {
          this.isSubmitted = false;
          this.snackBar.open(error.message, '', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  onSubmitDisableVideo(value: any) {
    if (!this.authService.isAuthenticated() || !this.authService.isAdmin()) {
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '410px',
        data: { email: this.email, password: this.password }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (this.authService.isAuthenticated() && this.authService.isAdmin()) {
          this.dataSharingService.loggedIn.next(true); // pass data to header.component.ts
        }
      });
      return;
    }

    this.isSubmitted = true;

    if (value.videoPostId <= 0 || value.videoPostId === undefined) {
      alert("YouTubeVideoId error");
      this.isSubmitted = false;

      return;
    }

    this.dataService.disableVideoPost(value.videoPostId)
      .subscribe(res => {
        if (res.status === 204) {
          this.isSubmitted = false;
          this.form.reset()
          this.snackBar.open('해당 영상을 삭제했습니다.', '', {
            duration: 2000,
            panelClass: ['green-snackbar']
          });
        }
      },
        error => {
          this.isSubmitted = false;
          this.snackBar.open('오류가 발생했습니다.', '', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  onAddNewSalaryInfo() {
    const dialogRef = this.dialog.open(AddSalaryInfoDialog, {
      width: '500px'
    });
  }

  onAddNewUploader() {
    const dialogRef = this.dialog.open(AddUploaderDialog, {
      width: '500px'
    });
  }

  onLoadCountries() {
    this.dataService.getCategoryCountryCareerUploader()
      .subscribe(res => {
        if (res.status === 200) {
          this.isCountriesLoaded = true;
          let result = this.itemsService.getSerialized<ICategoryCountryCareerUploader>(res.body);
          for (let c of result.countries) {
            this.countriesForSalary.push({ value: c.nameKR, label: c.nameKR });
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

  onSelectCountry(country: string) {
    this.dataService.getSalaryInfoOccupations(country)
      .subscribe(res => {
        if (res.status === 200) {
          this.occupations = [];
          this.isOccupationsLoaded = true;
          let result = this.itemsService.getSerialized<ISalaryInfo[]>(res.body);
          for (let r of result) {
            this.occupations.push({ value: r.salaryInfoId, label: r.occupation });
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

  private _filterUploaders(value: string): IUploader[] {
    const filterValue = value.toLowerCase();
    return this.uploaders.filter(u => u.name.toLowerCase().indexOf(filterValue) === 0);
  }
}