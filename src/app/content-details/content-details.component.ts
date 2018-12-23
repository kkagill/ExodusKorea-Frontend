import { AddMinimumColDialog } from './dialogs/add-minimum-col-dialog/add-minimum-col-dialog.component';
import { DataSharingService } from './../shared/services/data-sharing.service';
import { DeleteCommentDialog } from './dialogs/delete-comment-dialog/delete-comment-dialog.component';
import { ICountryInfo, IPriceInfo, ICurrencyInfo, IVideoComment, IVideoCommentReply, ISalaryInfo, IMinimumCoLInfo, ICareer, IJobSite } from './../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ItemsService } from '../shared/utils/items.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { isNumber } from 'util';
import { PriceInfoDetailDialog } from './dialogs/price-info-detail-dialog/price-info-detail-dialog.component';
import { MinimumColDetailDialog } from './dialogs/minimum-col-detail-dialog/minimum-col-detail-dialog.component';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss']
})
export class ContentDetailsComponent implements OnInit {
  page: number = 1;
  likes: string;
  safeURL: any;
  videoPostId: any;
  youtubeId: any;
  countryInfo: ICountryInfo;
  salaryInfo: ISalaryInfo;
  priceInfo: IPriceInfo;
  minimumCoLInfo: IMinimumCoLInfo;
  //currencyInfo: ICurrencyInfo;
  careerInfo: ICareer;
  jobSites: IJobSite[];
  videoComments: IVideoComment[];
  isCountryInfoLoaded: boolean = false;
  isSalaryInfoLoaded: boolean = false;
  isPriceInfoLoaded: boolean = false;
  isMinimumCoLInfoLoaded: boolean = false;
  isCareerInfoLoaded: boolean = false;
  //isCurrencyInfoLoaded: boolean = false;
  isYouTubeLikesLoaded: boolean = false;
  isVideoCommentsLoaded: boolean = false;
  isJobSitesLoaded: boolean = false;
  selectedVideoCommentId: number;
  selectedVideoCommentReplyId: number;
  commentForm: any;
  commentReplyForm: any;
  email: string;
  password: string;

  constructor(private dataService: DataService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private itemsService: ItemsService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private dataSharingService: DataSharingService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) {
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
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.videoPostId = params.get('id1');
      this.youtubeId = params.get('id2');
      this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.youtubeId}${'?autoplay=1'}`);
      this.loadCountryInfo();
      this.loadSalaryInfo();
      this.loadPriceInfo();
      this.loadMinimumCoLInfo();
      this.loadCareerInfo();
      this.loadJobSites();
      // this.loadCurrencyInfo();
      this.loadPostLikes();
      this.loadVideoComments();
    });
  }

  loadCountryInfo() {
    this.dataService.getCountryInfo(this.videoPostId)
      .subscribe(res => {
        if (res.status === 200) {
          this.isCountryInfoLoaded = true;
          this.countryInfo = this.itemsService.getSerialized<ICountryInfo>(res.body);
        }
      });
  }

  loadSalaryInfo() {
    this.dataService.getSalaryInfo(this.videoPostId)
      .subscribe(res => {
        if (res.status === 200) {
          this.isSalaryInfoLoaded = true;
          this.salaryInfo = this.itemsService.getSerialized<ISalaryInfo>(res.body);
        }
      });
  }

  loadPriceInfo() {
    this.dataService.getPriceInfo(this.videoPostId)
      .subscribe(res => {
        if (res.status === 200) {
          this.isPriceInfoLoaded = true;
          this.priceInfo = this.itemsService.getSerialized<IPriceInfo>(res.body);
        }
      });
  }

  loadMinimumCoLInfo() {
    this.dataService.getMinimumCoLInfo(this.videoPostId)
      .subscribe(res => {
        if (res.status === 200) {
          this.isMinimumCoLInfoLoaded = true;
          this.minimumCoLInfo = this.itemsService.getSerialized<IMinimumCoLInfo>(res.body);
        }
      });
  }

  loadCareerInfo() {
    this.dataService.getCareerInfo(this.videoPostId)
      .subscribe(res => {
        if (res.status === 200) {
          this.isCareerInfoLoaded = true;
          this.careerInfo = this.itemsService.getSerialized<ICareer>(res.body);
        }
      });
  }

  loadJobSites() {
    this.dataService.getJobSites()
      .subscribe(res => {
        if (res.status === 200) {
          this.isJobSitesLoaded = true;
          this.jobSites = this.itemsService.getSerialized<IJobSite[]>(res.body);
        }
      });
  }

  // loadCurrencyInfo() {
  //   this.dataService.getCurrencyInfo(this.videoPostId)
  //     .subscribe(res => {
  //       if (res.status === 200) {
  //         this.isCurrencyInfoLoaded = true;
  //         this.currencyInfo = this.itemsService.getSerialized<ICurrencyInfo>(res.body);
  //       }
  //     });
  // }

  loadPostLikes() {
    this.dataService.getPostLikesCombined(this.videoPostId, this.youtubeId)
      .subscribe(res => {
        if (res.status === 200) {
          this.isYouTubeLikesLoaded = true;
          this.likes = this.itemsService.getSerialized<string>(res.body);
        }
      });
  }

  loadVideoComments() {
    this.dataService.getVideoComments(this.videoPostId, this.youtubeId)
      .subscribe(res => {
        if (res.status === 200) {
          this.isVideoCommentsLoaded = true;
          this.videoComments = this.itemsService.getSerialized<IVideoComment[]>(res.body);
        }
      });
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

  onSubmitComment() {
    if (this.commentForm.invalid || !this.authService.isAuthenticated()) {
      return;
    }
    let body = {
      'comment': this.commentForm.value.comment,
      'videoPostId': this.videoPostId
    };
    this.isVideoCommentsLoaded = false;
    this.dataService.addNewComment(body)
      .subscribe(res => {
        if (res.status === 201) {
          let newComment = this.itemsService.getSerialized<IVideoComment>(res.body);
          this.itemsService.addItemToStart(this.videoComments, newComment);
          this.commentForm.get('comment').reset();

          setTimeout(() => {
            this.isVideoCommentsLoaded = true;
            this.snackBar.open('답글을 추가했습니다.', '', {
              duration: 2000,
              panelClass: ['green-snackbar']
            });
          }, 500);
        }
      },
        error => {
          this.isVideoCommentsLoaded = true;
        }
      );
  }

  onSubmitReply(videoCommentId: number, userId: string) {
    if (this.commentReplyForm.invalid || !this.authService.isAuthenticated()) {
      return;
    }
    let body = {
      'comment': this.commentReplyForm.value.comment,
      'videoCommentId': videoCommentId
    };
    this.dataService.addNewCommentReply(body)
      .subscribe(res => {
        if (res.status === 201) {
          let notifBody = {
            'videoCommentId': videoCommentId,
            'videoCommentReplyId': res.body.videoCommentReplyId,
            'videoPostId': this.videoPostId,
            'youTubeVideoId': this.youtubeId,
            'userId': userId,
            'comment': this.commentReplyForm.value.comment
          };
          this.dataService.addNewNotification(notifBody)
            .subscribe(notifRes => {
              if (notifRes.status === 201) {
                let target = this.videoComments.find(this.findCommentIndexToUpdate, res.body.videoCommentId);
                let index = this.videoComments.indexOf(target);
                let replies = this.videoComments[index].videoCommentReplies;
                let newCommentReply = this.itemsService.getSerialized<IVideoCommentReply>(res.body);
                replies.push(newCommentReply);
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
      'authorDisplayName': authorDisplayName
    };
    this.dataService.addNewCommentReplyReply(body)
      .subscribe(res => {
        if (res.status === 201) {
          let notifBody = {
            'videoCommentId': videoCommentId,
            'videoCommentReplyId': res.body.videoCommentReplyId,
            'videoPostId': this.videoPostId,
            'youTubeVideoId': this.youtubeId,
            'userId': userId,
            'comment': this.commentReplyForm.value.comment
          };
          this.dataService.addNewNotification(notifBody)
            .subscribe(notifRes => {
              if (notifRes.status === 201) {
                let target = this.videoComments.find(this.findCommentIndexToUpdate, res.body.videoCommentId);
                let index = this.videoComments.indexOf(target);
                let replies = this.videoComments[index].videoCommentReplies;
                let newCommentReply = this.itemsService.getSerialized<IVideoCommentReply>(res.body);
                replies.push(newCommentReply);
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

  onClickCommentReply(videoCommentId: number) {
    this.selectedVideoCommentId = videoCommentId;
  }

  onClickCommentReplyReply(videoCommentReplyId: number) {
    this.selectedVideoCommentReplyId = videoCommentReplyId;
  }

  onClickCancelReply() {
    this.selectedVideoCommentId = -1;
    this.commentReplyForm.get('comment').reset();
  }

  onClickCancelReplyReply() {
    this.selectedVideoCommentReplyId = -1;
    this.commentReplyForm.get('comment').reset();
  }

  onClickPostLikes() {
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

    this.dataService.findUserLikedPost(this.videoPostId)
      .subscribe(res => {
        if (res.status === 204) {
          this.dataService.updatePostLikes(this.videoPostId)
            .subscribe(res => {
              if (res.status === 204) {
                let body = {
                  'videoPostId': this.videoPostId
                };
                this.dataService.addPostLike(body)
                  .subscribe(res => {
                    if (res.status === 201) {
                      this.dataService.getPostLikesCombined(this.videoPostId, this.youtubeId)
                        .subscribe(res => {
                          if (res.status === 200) {
                            this.likes = this.itemsService.getSerialized<string>(res.body);
                          }
                        });
                    }
                  });
              }
            });
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
                            let target = this.videoComments.find(this.findCommentIndexToUpdate, res.body.videoCommentId);
                            let index = this.videoComments.indexOf(target);
                            this.videoComments[index] = res.body;
                          }
                        });
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
                            let target = this.videoComments.find(this.findCommentIndexToUpdate, res.body.videoCommentId);
                            let index = this.videoComments.indexOf(target);

                            let replies = this.videoComments[index].videoCommentReplies;
                            let targetReply = replies.find(this.findCommentReplyIndexToUpdate, res.body.videoCommentReplyId);
                            let indexReply = replies.indexOf(targetReply);
                            replies[indexReply] = res.body;
                          }
                        });
                    }
                  });
              }
            });
        }
      });
  }

  findCommentIndexToUpdate(videoComment) {
    return videoComment.videoCommentId === this;
  }

  findCommentReplyIndexToUpdate(videoCommentReply) {
    return videoCommentReply.videoCommentReplyId === this;
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
              this.itemsService.removeItems(this.videoComments, x => x.videoCommentId === _videoCommentId)

              setTimeout(() => {
                this.isVideoCommentsLoaded = true;
                this.snackBar.open('답글을 삭제했습니다.', '', {
                  duration: 2000,
                  panelClass: ['green-snackbar']
                });
              }, 500);
            }
          },
            error => {
              this.isVideoCommentsLoaded = true;
            }
          );
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
              let target = this.videoComments.find(this.findCommentIndexToUpdate, _videoCommentId);
              let index = this.videoComments.indexOf(target);
              let replies = this.videoComments[index].videoCommentReplies;
              this.itemsService.removeItems(replies, x => x.videoCommentReplyId === videoCommentReplyId)

              setTimeout(() => {
                this.isVideoCommentsLoaded = true;
                this.snackBar.open('답글을 삭제했습니다.', '', {
                  duration: 2000,
                  panelClass: ['green-snackbar']
                });
              }, 500);
            }
          },
            error => {
              this.isVideoCommentsLoaded = true;
            }
          );
      }
    });
  }

  onClickPriceInfoDetail(country: string) {
    const dialogRef = this.dialog.open(PriceInfoDetailDialog, {
      width: '500px',
      data: { country: country }
    });
  }

  onClickHelp(countryId: number, countryKR: string, countryEN: string, baseCurrency: string) {
    const dialogRef = this.dialog.open(AddMinimumColDialog, {
      width: '500px',
      data: { countryId: countryId, countryKR: countryKR, countryEN: countryEN, baseCurrency: baseCurrency }
    });
  }

  onClickMinimumCoLDetail(countryEN: string, baseCurrency: string) {
    const dialogRef = this.dialog.open(MinimumColDetailDialog, {
      width: '1100px',
      data: { countryEN: countryEN, baseCurrency: baseCurrency }
    });
  }

  onClickFollow() {
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
    let body = {
      'videoPostId': this.videoPostId
    };
    this.dataService.addToMyVideos(body)
      .subscribe(res => {
        if (res.status === 201) {
          setTimeout(() => {
            this.snackBar.open('내 찜한 영상에 추가되었습니다.', '', {
              duration: 2000,
              panelClass: ['green-snackbar']
            });
          }, 500);
        }
      },
        error => {
          if (error.status === 400 && error.error === "duplicate") {
            setTimeout(() => {
              this.snackBar.open('이미 내 찜한 영상에 추가되었습니다.', '', {
                duration: 2000,
                panelClass: ['warning-snackbar']
              });
            }, 500);
          }
        }
      );
  }
}
