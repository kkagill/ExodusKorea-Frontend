import { RegisterComponent } from './../../auth/register/register.component';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
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
  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  //   .pipe(
  //     map(result => result.matches)
  //   );

  // constructor(private breakpointObserver: BreakpointObserver,
  //   public dialog: MatDialog) { }

  constructor(private dataService: DataService,
    private itemsService: ItemsService,
    public dialog: MatDialog,
    public dialogNotif: MatDialog,
    private router: Router,
    public snackBar: MatSnackBar,
    private authService: AuthService,
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

  onClickNotification(notificationId: number, videoPostId: number, youTubeVideoId: string, videoCommentId: number, videoCommentReplyId: number) {
    this.dialogNotif.open(NotifCommentDialog, {
      width: '510px',
      data: {
        notificationId: notificationId,
        videoPostId: videoPostId,
        youTubeVideoId: youTubeVideoId,
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
    localStorage.setItem('userProfile', 'myVideos');
    this.router.navigate(['user-profile']);
  }

  onChangePassword() {
    localStorage.setItem('userProfile', 'changePassword');
    this.router.navigate(['user-profile']);
  }

  // openRegisterDialog(): void {
  //   const dialogRef = this.dialog.open(RegisterComponent, {
  //     width: '410px',
  //     data: { email: this.email, nickName: this.nickName, password: this.password, confirmPassword: this.confirmPassword }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The register dialog was closed');
  //   });
  // }

  onLogout() {
    this.authService.logout();
    this.snackBar.open('로그아웃 했습니다.', '', {
      duration: 3000,
      panelClass: ['green-snackbar']
    });
  }
}