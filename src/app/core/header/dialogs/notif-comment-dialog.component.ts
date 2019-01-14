import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { IVideoComment } from 'src/app/shared/interfaces';
import { DataService } from 'src/app/shared/services/data.service';
import { ItemsService } from 'src/app/shared/utils/items.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { DeleteCommentDialog } from 'src/app/content-details/dialogs/delete-comment-dialog/delete-comment-dialog.component';
import { isNumber } from 'util';
import { FormBuilder, Validators } from '@angular/forms';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';
import { Router } from '@angular/router';

export interface DialogData {
  notificationId: number,
  videoPostId: number,
  youTubeVideoId: string,
  isGoogleDriveVideo: number,
  videoCommentId: number;
  videoCommentReplyId: number;
}

@Component({
  selector: 'app-notif-comment-dialog',
  templateUrl: './notif-comment-dialog.component.html',
  styleUrls: ['./notif-comment-dialog.component.scss']
})
export class NotifCommentDialog implements OnInit {
  vc: IVideoComment
  email: string;
  password: string;
  commentForm: any;
  commentReplyForm: any;
  selectedVideoCommentId: number;
  selectedVideoCommentReplyId: number;
  isVideoCommentLoaded: boolean = false;
  hasCommentReply: boolean = false;

  constructor(private dataService: DataService,
    private authService: AuthService,
    private itemsService: ItemsService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private dataSharingService: DataSharingService,
    public dialogRef: MatDialogRef<NotifCommentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.commentForm = this.formBuilder.group({
      comment: [null, Validators.compose(
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(500)
        ])]
    });
    this.commentReplyForm = this.formBuilder.group({
      comment: [null, Validators.compose(
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(500)
        ])]
    });
  }

  ngOnInit() {
    this.loadVideoComment();
  }

  loadVideoComment() {
    this.dataService.updateHasReadById(this.data.notificationId)
      .subscribe(res => {
        if (res.status === 204) {
          this.dataService.getVideoComment(this.data.videoCommentId)
            .subscribe(res => {
              if (res.status === 200) {
                this.isVideoCommentLoaded = true;
                this.vc = this.itemsService.getSerialized<IVideoComment>(res.body);
                this.dataSharingService.updatedNotif.next(true); // pass data to header.component.ts
                for (let vcr of this.vc.videoCommentReplies) {
                  if (vcr.videoCommentReplyId === this.data.videoCommentReplyId) {
                    this.hasCommentReply = true;
                    break;
                  }
                }
              }
            },
              error => {
                if (error.status === 404) {
                  this.isVideoCommentLoaded = true;
                  this.vc = null;
                  this.dataSharingService.updatedNotif.next(true);
                } else {
                  this.snackBar.open('정보를 불러오는 과정에서 오류가 났습니다.', '', {
                    duration: 5000,
                    panelClass: ['error-snackbar']
                  });
                }
              }
            );
        }
      });
  }

  onClickCommentLikes(videoCommentId: number) {
    if (!this.authService.isAuthenticated()) {
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '410px',
        data: { email: this.email, password: this.password }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (this.authService.isAuthenticated()) {
          this.dataSharingService.loggedIn.next(true); // pass data to header.component.ts
        }
      });
      return;
    }

    this.dataService.findUserLikedComment(videoCommentId)
      .subscribe(res => {
        if (res.status === 204) {
          this.dataService.updateCommentLikes(videoCommentId)
            .subscribe(res => {
              if (res.status === 204) {
                let body = {
                  'videoCommentId': videoCommentId
                };
                this.dataService.addCommentLike(body)
                  .subscribe(res => {
                    if (res.status === 201) {
                      this.dataService.getVideoComment(videoCommentId)
                        .subscribe(res => {
                          if (res.status === 200) {
                            this.isVideoCommentLoaded = true;
                            this.vc = this.itemsService.getSerialized<IVideoComment>(res.body);
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
                  });
              }
            });
        }
      });
  }

  onClickCommentReplyLikes(videoCommentReplyId: number) {
    if (!this.authService.isAuthenticated()) {
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '410px',
        data: { email: this.email, password: this.password }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (this.authService.isAuthenticated()) {
          this.dataSharingService.loggedIn.next(true); // pass data to header.component.ts
        }
      });
      return;
    }

    this.dataService.findUserLikedCommentReply(videoCommentReplyId)
      .subscribe(res => {
        if (res.status === 204) {
          this.dataService.updateCommentReplyLikes(videoCommentReplyId)
            .subscribe(res => {
              if (res.status === 204) {
                let body = {
                  'videoCommentReplyId': videoCommentReplyId
                };
                this.dataService.addCommentReplyLike(body)
                  .subscribe(res => {
                    if (res.status === 201) {
                      this.dataService.getVideoCommentReply(videoCommentReplyId)
                        .subscribe(res => {
                          if (res.status === 200) {
                            this.loadVideoComment();
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
                  });
              }
            });
        }
      });
  }

  onClickCommentDelete(videoCommentId: number) {
    if (!this.authService.isAuthenticated()) {
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '410px',
        data: { email: this.email, password: this.password }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (this.authService.isAuthenticated()) {
          this.dataSharingService.loggedIn.next(true); // pass data to header.component.ts
        }
      });
      return;
    }

    const dialogRef = this.dialog.open(DeleteCommentDialog, {
      width: '250px',
      data: { videoCommentId: videoCommentId }
    });

    dialogRef.afterClosed().subscribe(_videoCommentId => {
      if (_videoCommentId !== undefined && isNumber(_videoCommentId)) {
        this.dataService.deleteComment(_videoCommentId)
          .subscribe(res => {
            if (res.status === 204) {
              this.isVideoCommentLoaded = true;
              this.vc = null;

              setTimeout(() => {
                this.snackBar.open('답글을 삭제했습니다.', '', {
                  duration: 2000,
                  panelClass: ['green-snackbar']
                });
              }, 500);
            }
          });
      }
    });
  }

  onClickCommentReplyDelete(videoCommentId: number, videoCommentReplyId: number) {
    if (!this.authService.isAuthenticated()) {
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '410px',
        data: { email: this.email, password: this.password }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (this.authService.isAuthenticated()) {
          this.dataSharingService.loggedIn.next(true); // pass data to header.component.ts
        }
      });
      return;
    }

    const dialogRef = this.dialog.open(DeleteCommentDialog, {
      width: '250px',
      data: { videoCommentId: videoCommentId }
    });

    dialogRef.afterClosed().subscribe(_videoCommentId => {
      if (_videoCommentId !== undefined && isNumber(_videoCommentId)) {
        this.dataService.deleteCommentReply(videoCommentReplyId)
          .subscribe(res => {
            if (res.status === 204) {
              this.loadVideoComment();

              setTimeout(() => {
                this.isVideoCommentLoaded = true;
                this.snackBar.open('답글을 삭제했습니다.', '', {
                  duration: 2000,
                  panelClass: ['green-snackbar']
                });
              }, 500);
            }
          },
            error => {
              this.isVideoCommentLoaded = true;
            }
          );
      }
    });
  }

  onSubmitReply(videoCommentId: number, userId: string) {
    if (this.commentReplyForm.invalid || !this.authService.isAuthenticated()) {
      return;
    }
    let body = {
      'comment': this.commentReplyForm.value.comment,
      'videoCommentId': videoCommentId,
      'videoPostId': this.data.videoPostId,
    };
    this.dataService.addNewCommentReply(body)
      .subscribe(res => {
        if (res.status === 201) {
          let notifBody = {
            'videoCommentId': videoCommentId,
            'videoCommentReplyId': res.body.videoCommentReplyId,
            'videoPostId': this.data.videoPostId,
            'youTubeVideoId': this.data.youTubeVideoId,
            'userId': userId,
            'comment': this.commentReplyForm.value.comment
          };
          this.dataService.addNewNotification(notifBody)
            .subscribe(notifRes => {
              if (notifRes.status === 201) {
                this.loadVideoComment();
                this.onClickCancelReply();

                setTimeout(() => {
                  this.snackBar.open('답글을 추가했습니다.', '', {
                    duration: 2000,
                    panelClass: ['green-snackbar']
                  });
                }, 500);
              }
            });
        }
      });
  }

  onSubmitReplyReply(videoCommentId: number, authorDisplayName: string, userId: string) {
    if (this.commentReplyForm.invalid || !this.authService.isAuthenticated()) {
      return;
    }
    let body = {
      'comment': this.commentReplyForm.value.comment,
      'videoCommentId': videoCommentId,
      'authorDisplayName': authorDisplayName,
      'videoPostId': this.data.videoPostId
    };
    this.dataService.addNewCommentReplyReply(body)
      .subscribe(res => {
        if (res.status === 201) {
          let notifBody = {
            'videoCommentId': videoCommentId,
            'videoCommentReplyId': res.body.videoCommentReplyId,
            'videoPostId': this.data.videoPostId,
            'youTubeVideoId': this.data.youTubeVideoId,
            'userId': userId,
            'comment': this.commentReplyForm.value.comment
          };
          this.dataService.addNewNotification(notifBody)
            .subscribe(notifRes => {
              if (notifRes.status === 201) {
                this.loadVideoComment();
                this.onClickCancelReplyReply();

                setTimeout(() => {
                  this.snackBar.open('답글을 추가했습니다.', '', {
                    duration: 2000,
                    panelClass: ['green-snackbar']
                  });
                }, 500);
              }
            });
        }
      });
  }

  onClickCancelReply() {
    this.selectedVideoCommentId = -1;
    this.commentReplyForm.get('comment').reset();
  }

  onClickCancelReplyReply() {
    this.selectedVideoCommentReplyId = -1;
    this.commentReplyForm.get('comment').reset();
  }

  onClickCommentBox() {
    if (!this.authService.isAuthenticated()) {
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '410px',
        data: { email: this.email, password: this.password }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (this.authService.isAuthenticated()) {
          this.dataSharingService.loggedIn.next(true); // pass data to header.component.ts
        }
      });
    }
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onClickCommentReply(videoCommentId: number) {
    this.selectedVideoCommentId = videoCommentId;
  }

  onClickCommentReplyReply(videoCommentReplyId: number) {
    this.selectedVideoCommentReplyId = videoCommentReplyId;
  }

  onClickRedirect() {
    this.dialogRef.close();
    this.router.navigate(['content-details', this.data.videoPostId, this.data.youTubeVideoId, this.data.isGoogleDriveVideo]);
  }
}
