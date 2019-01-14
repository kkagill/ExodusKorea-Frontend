import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IVideoPost, IProfile, IApplicationUser } from '../shared/interfaces';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { DataService } from '../shared/services/data.service';
import { ItemsService } from '../shared/utils/items.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  page: number = 1;
  selectedMyVideos: boolean = false;
  selectedProfile: boolean = false;
  selectedChangePassword: boolean = false;
  selectedWithdrawMembership: boolean = false;
  searchResult: IVideoPost[];
  profile: IProfile;
  isMyVideosLoaded: boolean = false;
  isProfileLoaded: boolean = false;
  isChangePasswordLoaded: boolean = false;
  isWithdrawMembershipLoaded: boolean = false;
  isChangeNickNameClicked: boolean = false;
  backgroundUrl = '../../../assets/images/countries/';
  searchText: string;
  error = '';
  nickNameChange = '';
  password = '';
  reason = '';

  oldPasswordFormControl
  newPasswordFormControl;
  confirmPasswordFormControl;
  changePasswordForm: FormGroup;

  constructor(private router: Router,
    public snackBar: MatSnackBar,
    private dataService: DataService,
    private authService: AuthService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private itemsService: ItemsService) {
    this.oldPasswordFormControl = new FormControl('', [
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")
    ]);
    this.newPasswordFormControl = new FormControl('', [
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")
    ]);
    this.confirmPasswordFormControl = new FormControl('', [
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")
    ]);
    this.changePasswordForm = new FormGroup({
      oldPassword: this.oldPasswordFormControl,
      newPassword: this.newPasswordFormControl,
      confirmPassword: this.confirmPasswordFormControl
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let category = params.get('id');
      let myVideos = localStorage.getItem('myVideos');

      if (myVideos === 'true') {
        localStorage.removeItem('myVideos');
        this.selectedMyVideos = true;
        this.loadMyVideos();
      } else if (category != null && category === 'my-videos' && myVideos == null) {
        this.selectedMyVideos = true;
        this.selectedProfile = false;
        this.selectedChangePassword = false;
        this.selectedWithdrawMembership = false;
        this.isProfileLoaded = false;
        this.isChangePasswordLoaded = false;
        this.isWithdrawMembershipLoaded = false;
        this.loadMyVideos();
      } else if (category != null && category === 'profile' && myVideos == null) {
        this.selectedMyVideos = false;
        this.selectedProfile = true;
        this.selectedChangePassword = false;
        this.selectedWithdrawMembership = false;
        this.isChangePasswordLoaded = false;
        this.isMyVideosLoaded = false;
        this.isWithdrawMembershipLoaded = false;
        this.loadProfile();
      } else if (category != null && category === 'change-password' && myVideos == null) {
        this.selectedMyVideos = false;
        this.selectedProfile = false;
        this.selectedChangePassword = true;
        this.selectedWithdrawMembership = false;
        this.isProfileLoaded = false;
        this.isChangePasswordLoaded = true;
        this.isMyVideosLoaded = false;
        this.isWithdrawMembershipLoaded = false;
      } else if (category != null && category === 'withdraw-membership' && myVideos == null) {
        this.selectedMyVideos = false;
        this.selectedProfile = false;
        this.selectedChangePassword = false;
        this.selectedWithdrawMembership = true;
        this.isProfileLoaded = false;
        this.isChangePasswordLoaded = false;
        this.isMyVideosLoaded = false;
        this.isWithdrawMembershipLoaded = true;
      }
    });
  }

  loadMyVideos() {
    this.dataService.getMyVideos()
      .subscribe(res => {
        if (res.status === 200) {
          this.isMyVideosLoaded = true;
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

  loadProfile() {
    this.authService.getProfile()
      .subscribe(res => {
        if (res.status === 200) {
          this.isProfileLoaded = true;
          this.profile = this.itemsService.getSerialized<IProfile>(res.body);
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

  onSubmit() {
    if (this.changePasswordForm.invalid ||
      this.changePasswordForm.value.oldPassword === '' ||
      this.changePasswordForm.value.newPassword === '' ||
      this.changePasswordForm.value.confirmPassword === '') {
      return;
    }
    let body = {
      'oldPassword': this.changePasswordForm.controls.oldPassword.value,
      'newPassword': this.changePasswordForm.controls.newPassword.value,
      'confirmPassword': this.changePasswordForm.controls.confirmPassword.value
    };
    this.authService.changePassword(body)
      .subscribe(res => {
        if (res.status === 204) {
          this.error = '';
          this.changePasswordForm.reset();
          this.snackBar.open('비밀번호가 변경되었습니다.', '', {
            duration: 3000,
            panelClass: ['green-snackbar']
          });
        }
      },
        error => {
          if (error.status === 400) {
            if (error.error === "Passwords do not match") {
              this.error = '입력된 두 비밀번호가 일치하지 않습니다.';
            } else if (error.error === "PasswordMismatch") {
              this.error = '현재 비밀번호가 맞지 않습니다.';
            }
          }
          else {
            this.error = '오류가 발생했습니다. 다시 시도해주세요.';
          }
        }
      );
  }

  onMatCardClick(videoPostId: number, videoId: string, isGoogleDriveVideo: number) {
    localStorage.setItem('myVideos', 'true');
    this.router.navigate(['content-details', videoPostId, videoId, isGoogleDriveVideo]);
  }

  onSelectMyVideos() {
    this.location.go('account-info/my-videos');
    this.selectedProfile = false;
    this.selectedChangePassword = false;
    this.selectedMyVideos = true;
    this.selectedWithdrawMembership = false;
    this.isProfileLoaded = false;
    this.isChangePasswordLoaded = false;
    this.isWithdrawMembershipLoaded = false;
    this.loadMyVideos();
  }

  onSelectProfile() {
    this.location.go('account-info/profile');
    this.selectedProfile = true;
    this.selectedChangePassword = false;
    this.selectedMyVideos = false;
    this.selectedWithdrawMembership = false;
    this.isMyVideosLoaded = false;
    this.isChangePasswordLoaded = false;
    this.isWithdrawMembershipLoaded = false;
    this.loadProfile();
  }

  onSelectChangePassword() {
    this.location.go('account-info/change-password');
    this.selectedProfile = false;
    this.selectedChangePassword = true;
    this.selectedMyVideos = false;
    this.selectedWithdrawMembership = false;
    this.isMyVideosLoaded = false;
    this.isProfileLoaded = false;
    this.isChangePasswordLoaded = true;
    this.isWithdrawMembershipLoaded = false;
  }

  onSelectWithdrawMembership() {
    this.location.go('account-info/withdraw-membership');
    this.selectedProfile = false;
    this.selectedChangePassword = false;
    this.selectedMyVideos = false;
    this.selectedWithdrawMembership = true;
    this.isMyVideosLoaded = false;
    this.isProfileLoaded = false;
    this.isChangePasswordLoaded = false;
    this.isWithdrawMembershipLoaded = true;
  }

  onChangeNickName() {
    this.isChangeNickNameClicked = true;
  }

  onClickCancel() {
    this.isChangeNickNameClicked = false;
  }

  onClickChangeNickName() {
    if (this.nickNameChange === '' || this.nickNameChange.trim().length === 0) {
      return;
    } else {
      this.authService.changeNickName(this.nickNameChange)
        .subscribe(res => {
          if (res.status === 200) {
            this.isChangeNickNameClicked = false;
            let user = this.itemsService.getSerialized<IApplicationUser>(res.body);
            this.profile.nickName = user.nickName;

            this.snackBar.open('닉네임이 변경되었습니다.', '', {
              duration: 3000,
              panelClass: ['green-snackbar']
            });
          }
        },
          error => {
            if (error.error === "DuplicateNickName") {
              this.snackBar.open('이미 등록된 닉네임입니다.', '', {
                duration: 3000,
                panelClass: ['warning-snackbar']
              });
            } else if (error.error === "MaxLengthExceeded") {
              this.snackBar.open('닉네임은 10글자 이하로 입력해주세요.', '', {
                duration: 4000,
                panelClass: ['warning-snackbar']
              });
            } else {
              this.snackBar.open('오류가 났습니다.', '', {
                duration: 5000,
                panelClass: ['error-snackbar']
              });
            }
          });
    }
  }

  updateSubscription() {
    this.authService.updateSubscription(this.profile.hasCanceledSubscription)
      .subscribe(res => {
        if (res.status === 204) {
          if (this.profile.hasCanceledSubscription) {
            this.snackBar.open('구독이 취소되었습니다.', '', {
              duration: 3000,
              panelClass: ['warning-snackbar']
            });
          } else {
            if (this.profile.hasCanceledSubscription == false) {
              this.snackBar.open('구독이 복구되었습니다.', '', {
                duration: 3000,
                panelClass: ['green-snackbar']
              });
            }
          }
        }
      },
        error => {
          this.snackBar.open('오류가 났습니다.', '', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  withdrawMembership() {
    if (this.password === '' || this.password.trim().length === 0) {
      return;
    } else {
      this.authService.deleteAccount(this.reason, this.password)
        .subscribe(res => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          this.router.navigate(['withdraw-membership']);
        },
          error => {
            if (error.error === "InvalidAttempt") {
              this.snackBar.open('비밀번호 인증 실패. 다시 시도해주세요.', '', {
                duration: 4000,
                panelClass: ['warning-snackbar']
              });
            } else {
              this.snackBar.open('오류가 났습니다.', '', {
                duration: 5000,
                panelClass: ['error-snackbar']
              });
            }
          });
    }
  }
}