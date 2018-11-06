import { ICountryInfo, IPriceInfo, ICurrencyInfo, IVideoComment } from './../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../shared/utils/items.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LoginComponent } from 'src/app/auth/login/login.component';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss']
})
export class ContentDetailsComponent implements OnInit {
  page: number = 1;
  likes: string;
  safeURL: any;
  newVideoId: any;
  youtubeId: any;
  countryInfo: ICountryInfo;
  priceInfo: IPriceInfo;
  currencyInfo: ICurrencyInfo;
  videoComments: IVideoComment[];
  isCountryInfoLoaded: boolean = false;
  isPriceInfoLoaded: boolean = false;
  isCurrencyInfoLoaded: boolean = false;
  isYouTubeLikesLoaded: boolean = false;
  isVideoCommentsLoaded: boolean = false;
  selectedVideoCommentId: number;
  commentForm: any;
  commentReplyForm: any;
  email: string;
  password: string;

  constructor(private dataService: DataService,
              private authService: AuthService,
              private activedRoute: ActivatedRoute,
              private itemService: ItemsService,
              private sanitizer: DomSanitizer,
              private formBuilder: FormBuilder,
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
    this.newVideoId = this.activedRoute.snapshot.paramMap.get('id1');
    this.youtubeId = this.activedRoute.snapshot.paramMap.get('id2');
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.youtubeId}${'?autoplay=1'}`);
    this.loadCountryInfo();
    this.loadPriceInfo();
    this.loadCurrencyInfo();
    this.loadYouTubeLikes();
    this.loadVideoComments();
  }

  loadCountryInfo() {
    this.dataService.getCountryInfo(this.newVideoId)
      .subscribe(res => {
        if (res.status === 200) {
          this.isCountryInfoLoaded = true;
          this.countryInfo = this.itemService.getSerialized<ICountryInfo>(res.body);
        }
        else {

        }
      });
  }

  loadPriceInfo() {
    this.dataService.getPriceInfo(this.newVideoId)
      .subscribe(res => {
        if (res.status === 200) {
          this.isPriceInfoLoaded = true;
          this.priceInfo = this.itemService.getSerialized<IPriceInfo>(res.body);
        }
        else {

        }
      });
  }

  loadCurrencyInfo() {
    this.dataService.getCurrencyInfo(this.newVideoId)
      .subscribe(res => {
        if (res.status === 200) {
          this.isCurrencyInfoLoaded = true;
          this.currencyInfo = this.itemService.getSerialized<ICurrencyInfo>(res.body);
        }
        else {

        }
      });
  }

  loadYouTubeLikes() {
    this.dataService.getYouTubeLikes(this.youtubeId)
      .subscribe(res => {
        if (res.status === 200) {
          this.isYouTubeLikesLoaded = true;
          this.likes = this.itemService.getSerialized<string>(res.body);
        }
        else {

        }
      });
  }

  loadVideoComments() {
    this.dataService.getVideoComments(this.newVideoId, this.youtubeId)
      .subscribe(res => {
        if (res.status === 200) {
          this.isVideoCommentsLoaded = true;
          this.videoComments = this.itemService.getSerialized<IVideoComment[]>(res.body);
        }
        else {

        }
      });
  }

  onClickCommentBox() {
    if (!this.authService.isAuthenticated()) {
      this.dialog.open(LoginComponent, {
        width: '410px',
        data: { email: this.email, password: this.password }
      });
    }
  }

  onSubmitComment() {
    if (this.commentForm.invalid || !this.authService.isAuthenticated()) {
      return;
    }
    let body = {
      'comment': this.commentForm.value.comment,
      'newVideoId': this.newVideoId
    };
    this.dataService.addNewComment(body)
      .subscribe(res => {
        if (res.status === 201) {
          this.isVideoCommentsLoaded = false;
          this.loadVideoComments();
          setTimeout(() => {
            this.snackBar.open('답글을 추가했습니다.', '', {
              duration: 3000,
              panelClass: ['green-snackbar']
            });
          }, 1500);
        }
      },
        error => {
          // if (error.status === 400) {
          //   if (error.error === "Passwords do not match") {
          //     this.error = '입력된 두 비밀번호가 일치하지 않습니다.';
          //   }           
          // }
          // else {
          //   this.error = '오류가 발생했습니다. 다시 시도해주세요.';
          // }
        }
      );
  }

  onSubmitReply(videoCommentId: number) {
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
          this.isVideoCommentsLoaded = false;
          this.loadVideoComments();
          setTimeout(() => {
            this.snackBar.open('답글을 추가했습니다.', '', {
              duration: 3000,
              panelClass: ['green-snackbar']
            });
          }, 1500);

        this.onClickCancel();
        }
      },
        error => {
          // if (error.status === 400) {
          //   if (error.error === "Passwords do not match") {
          //     this.error = '입력된 두 비밀번호가 일치하지 않습니다.';
          //   }           
          // }
          // else {
          //   this.error = '오류가 발생했습니다. 다시 시도해주세요.';
          // }
        }
      );
  }

  onClickCommentReply(videoCommentId: number) {
    this.selectedVideoCommentId = videoCommentId;
  }

  onClickCancel() {
    this.selectedVideoCommentId = -1;
    this.commentReplyForm.get('comment').reset();
  }

  onClickLikes(videoCommentId: number) {
    this.dataService.updateCommentLikes(videoCommentId)
    .subscribe(res => {
      if (res.status === 204) {
        this.loadVideoComments();
      }
    },
      error => {
        // if (error.status === 400) {
        //   if (error.error === "Passwords do not match") {
        //     this.error = '입력된 두 비밀번호가 일치하지 않습니다.';
        //   }           
        // }
        // else {
        //   this.error = '오류가 발생했습니다. 다시 시도해주세요.';
        // }
      }
    );
  }
}
