import { Component, OnInit } from '@angular/core';
import { ICategory, IVideoPost } from '../shared/interfaces';
import { Router } from '@angular/router';
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
  myVideos: boolean = false;
  changePassword: boolean = false;
  searchResult: IVideoPost[];
  categories: ICategory[];
  isMyVideosLoaded: boolean = false;
  isChangePasswordLoaded: boolean = false;
  backgroundUrl = '../../../assets/images/countries/';
  searchText: string;
  error = '';

  oldPasswordFormControl
  newPasswordFormControl;
  confirmPasswordFormControl;
  changePasswordForm: FormGroup;

  constructor(private router: Router,
    public snackBar: MatSnackBar,
    private dataService: DataService,
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
    let userProfile = localStorage.getItem('userProfile');

    if (userProfile != null && userProfile === 'myVideos') {
      localStorage.removeItem('userProfile');
      this.myVideos = true;
      //this.loadMyVideos();
    } else if (userProfile != null && userProfile === 'changePassword') {
      localStorage.removeItem('userProfile');
      this.changePassword = true;
      this.isChangePasswordLoaded = true;
    }
  }

  // loadMyVideos() {
  //   this.dataService.getMyVideos()
  //     .subscribe(res => {
  //       if (res.status === 200) {
  //         this.isMyVideosLoaded = true;
  //         this.categories = this.itemsService.getSerialized<ICategory[]>(res.body);

  //       }
  //     },
  //       error => {
  //         this.snackBar.open('정보를 불러오는 과정에서 오류가 났습니다.', '', {
  //           duration: 5000,
  //           panelClass: ['error-snackbar']
  //         });
  //       }
  //     );
  // }

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
    this.dataService.changePassword(body)
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

  onSelectMyVideos() {
    this.changePassword = false;
    this.myVideos = true;
    this.isChangePasswordLoaded = false;
    //this.loadMyVideos();
  }

  onSelectChangePassword() {
    this.changePassword = true;
    this.myVideos = false;
    this.isChangePasswordLoaded = true;
  }
}
