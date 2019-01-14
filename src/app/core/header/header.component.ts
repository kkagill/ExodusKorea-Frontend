import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { ItemsService } from 'src/app/shared/utils/items.service';
import { INotification } from 'src/app/shared/interfaces';
import { NotifCommentDialog } from './dialogs/notif-comment-dialog.component';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  email: string;
  nickName: string;
  password: string;
  confirmPassword: string;
  notifications: INotification[];
  newNotifications: number = 0;
  isNotificationLoaded: boolean = false;
  hasNotifications: boolean = false;

  constructor(private dataService: DataService,
    private itemsService: ItemsService,
    public dialog: MatDialog,
    public dialogNotif: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar,
    public authService: AuthService,
    private dataSharingService: DataSharingService) {
    // once the user reads new notification, it updates right away
    this.dataSharingService.updatedNotif.subscribe(flag => {
      if (flag) {
        this.loadNotifications();
      }
    });
    // once the user is logged in from anywhere, it retrieves notifications
    this.dataSharingService.loggedIn.subscribe(flag => {
      if (flag) {
        this.loadNotifications();
      }
    });
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      // listen to new notifications on different route
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        this.loadNotifications();
      });
    }
  }

  loadNotifications() {
    this.dataService.getNotificationsForUser()
      .subscribe(res => {
        if (res.status === 200) {
          this.notifications = this.itemsService.getSerialized<INotification[]>(res.body);

          if (this.notifications.length > 0) {
            this.hasNotifications = true;
          } else {
            this.hasNotifications = false;
          }

          this.newNotifications = 0;

          for (let n of this.notifications) {
            if (!n.hasRead) {
              this.newNotifications += 1;
            }
          }

          this.isNotificationLoaded = true;
        }
      });
  }

  findNotifIndexToUpdate(notification) {
    return notification.notificationId === this;
  }

  onClickNotification(notificationId: number,
    videoPostId: number,
    youTubeVideoId: string,
    isGoogleDriveVideo: number,
    videoCommentId: number,
    videoCommentReplyId: number) {
    this.dialogNotif.open(NotifCommentDialog, {
      width: '510px',
      data: {
        notificationId: notificationId,
        videoPostId: videoPostId,
        youTubeVideoId: youTubeVideoId,
        isGoogleDriveVideo: isGoogleDriveVideo,
        videoCommentId: videoCommentId,
        videoCommentReplyId: videoCommentReplyId
      }
    });
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '410px',
      data: { email: this.email, password: this.password }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.authService.isAuthenticated()) {
        this.loadNotifications();
      }
    });
  }

  onClickMyVideos() {
    this.router.navigate(['account-info', "my-videos"]);
  }

  onClickProfile() {
    this.router.navigate(['account-info', "profile"]);
  }

  onChangePassword() {
    this.router.navigate(['account-info', "change-password"]);
  }

  onLogout() {
    this.authService.logout();
    this.snackBar.open('로그아웃 했습니다.', '', {
      duration: 3000,
      panelClass: ['green-snackbar']
    });
  }
}