import { JidDescriptionDialog } from './../jid-description-dialog/jid-description-dialog.component';
import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ItemsService } from 'src/app/shared/utils/items.service';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';
import { Router } from '@angular/router';
import { IVideoPost } from 'src/app/shared/interfaces';
import { LoginComponent } from 'src/app/auth/login/login.component';

export interface DialogData {
  description: string;
  jobsInDemandId: number;
  hasVideoPost: boolean;
  titleKR: string;
  titleEN: string;
  countryKR: string;
  difficultyLevel: string;
  link: string,
  jobSite: string,
  salary: number,
  currency: string
}

@Component({
  selector: 'app-jid-detail-dialog',
  templateUrl: './jid-detail-dialog.component.html',
  styleUrls: ['./jid-detail-dialog.component.scss']
})
export class JidDetailDialog implements OnInit {
  searchResult: IVideoPost[];
  isSearchResultLoaded: boolean = false;
  email: string;
  password: string;
  page: number = 1;

  constructor(private dataService: DataService,
    private authService: AuthService,
    private itemsService: ItemsService,
    public snackBar: MatSnackBar,
    private dataSharingService: DataSharingService,
    private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<JidDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.loadJobsInDemandVideos();
  }

  loadJobsInDemandVideos() {
    this.dataService.getJobsInDemandVideos(this.data.jobsInDemandId)
      .subscribe(res => {
        if (res.status === 200) {
          this.isSearchResultLoaded = true;
          this.searchResult = this.itemsService.getSerialized<IVideoPost[]>(res.body);
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
      this.onCancelClick();
      this.router.navigate(['content-details', videoPostId, videoId, isGoogleDriveVideo]);
    }
  }

  onClickDescription() {
    const dialogRef = this.dialog.open(JidDescriptionDialog, {
      width: '500px',
      data: { difficultyLevel: this.data.difficultyLevel, 
              description: this.data.description, 
              titleKR: this.data.titleKR, 
              titleEN: this.data.titleEN,
              link: this.data.link,
              jobSite: this.data.jobSite,
              salary: this.data.salary,
              currency: this.data.currency }
    });
  }

  onShinChungVideo() {
    this.dialogRef.close();
    this.router.navigate(['upload-video']);
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
