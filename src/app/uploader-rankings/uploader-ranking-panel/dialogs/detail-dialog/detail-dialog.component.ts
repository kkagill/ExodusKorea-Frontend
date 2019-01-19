import { Component, OnInit, Inject } from '@angular/core';
import { IUploaderRanking, IVideoPost } from 'src/app/shared/interfaces';
import { DataService } from 'src/app/shared/services/data.service';
import { ItemsService } from 'src/app/shared/utils/items.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';
import { Router } from '@angular/router';

export interface DialogData {
  uploaderRanking: IUploaderRanking;
}

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.scss']
})
export class DetailDialog implements OnInit {
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
    public dialogRef: MatDialogRef<DetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.loadUploaderVideos();
  }

  loadUploaderVideos() {
    this.dataService.getUploaderVideos(this.data.uploaderRanking.uploaderId)
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

  onCancelClick() {
    this.dialogRef.close();
  }
}