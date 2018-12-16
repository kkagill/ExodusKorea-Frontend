import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IVideoPost } from '../shared/interfaces';
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
  selectedChangePassword: boolean = false;
  searchResult: IVideoPost[];
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
        this.selectedChangePassword = false;
        this.isChangePasswordLoaded = false;
        this.loadMyVideos();
      } else if (category != null && category === 'change-password' && myVideos == null) {
        this.selectedMyVideos = false;
        this.selectedChangePassword = true;
        this.isChangePasswordLoaded = true;
        this.isMyVideosLoaded = false;
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

  onMatCardClick(videoPostId: number, videoId: string) {
    localStorage.setItem('myVideos', 'true');
    this.router.navigate(['content-details', videoPostId, videoId]);
  }
  
  onSelectMyVideos() {
    this.location.go('account-info/my-videos');    
    this.selectedChangePassword = false;
    this.selectedMyVideos = true;
    this.isChangePasswordLoaded = false;
    this.loadMyVideos();
  }

  onSelectChangePassword() {
    this.location.go('account-info/change-password');
    this.selectedChangePassword = true;
    this.selectedMyVideos = false;
    this.isMyVideosLoaded = false;
    this.isChangePasswordLoaded = true;
  }
}
