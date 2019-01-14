import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DataSharingService } from '../shared/services/data-sharing.service';
import { AuthService } from '../shared/services/auth.service';
import { ItemsService } from '../shared/utils/items.service';
import { DataService } from '../shared/services/data.service';
import { ISalaryInfo, ICategoryCountryUploader, IUploader, IVideoPostInfo } from '../shared/interfaces';
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
  countriesForSalary: Array<any> = [];
  occupations: Array<any> = [];
  isChecked: boolean = false;
  isGDVChecked: boolean = false;
  isDDLLoaded: boolean = false;
  isCountriesLoaded: boolean = false;
  isOccupationsLoaded: boolean = false;
  isYouTubeInfoLoaded: boolean = false;
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
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loadAllDDLInfo();
    this.onLoadCountries();
  }

  loadAllDDLInfo() {
    this.dataService.getCategoryCountryUploader()
      .subscribe(res => {
        if (res.status === 200) {
          this.isDDLLoaded = true;
          let result = this.itemsService.getSerialized<ICategoryCountryUploader>(res.body);
          for (let c of result.categories) {
            if (c.categoryId !== 1) {
              this.categories.push({ value: c.categoryId, label: c.name });
            }
          }
          for (let c of result.countries) {
            this.countries.push({ value: c.countryId, label: c.nameKR });
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

  private _filterUploaders(value: string): IUploader[] {
    const filterValue = value.toLowerCase();
    return this.uploaders.filter(u => u.name.toLowerCase().indexOf(filterValue) === 0);
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
    this.dataService.getCategoryCountryUploader()
      .subscribe(res => {
        if (res.status === 200) {
          this.isCountriesLoaded = true;
          let result = this.itemsService.getSerialized<ICategoryCountryUploader>(res.body);
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
}