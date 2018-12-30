import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { TermsOfServiceDialog } from './dialog/terms-of-service/terms-of-service.component';
import { environment } from '../../../environments/environment';

export interface RegisterDialogData {
  email: string;
  nickName: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  success = '';
  error = '';
  isCaptchaPassed = false;
  emailFormControl;
  nickNameFormControl;
  passwordFormControl;
  confirmPasswordFormControl;
  tandsFormControl;
  recaptchaFormControl;
  registerForm: FormGroup;
  siteKey = environment.RecaptchaSiteKey; 

  constructor(public router: Router,
    public http: HttpClient,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    // public dialogRef: MatDialogRef<RegisterComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: RegisterDialogData,
    public snackBar: MatSnackBar,
   ) {
    this.emailFormControl = new FormControl('', [Validators.email]);
    this.nickNameFormControl = new FormControl('', []);
    this.passwordFormControl = new FormControl('', [Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")]);
    this.confirmPasswordFormControl = new FormControl('', [Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")]);
    this.tandsFormControl = new FormControl('', []);
    this.registerForm = new FormGroup({
      email: this.emailFormControl,
      nickName: this.nickNameFormControl,
      password: this.passwordFormControl,
      confirmPassword: this.confirmPasswordFormControl,
      recaptcha: new FormControl(null),
      tands: this.tandsFormControl
    });
  }

  submit(captchaResponse: string) {
    let body = { 'response': captchaResponse };
    this.authService.getReCaptchaResponse(body)
      .subscribe(res => {
        if (res.status === 200) {
          this.isCaptchaPassed = true;
        }
        else {
          this.error = 'reCAPTCHA에서 오류가 났습니다. 다시 시도해주세요.'
          this.isCaptchaPassed = false;
        }
      })
  }

  onSubmit() {
    if (this.registerForm.invalid || 
      this.registerForm.value.email === '' || 
      this.registerForm.value.nickName === '' ||
      this.registerForm.value.password === '' ||
      this.registerForm.value.confirmPassword === '' ||
      this.registerForm.value.tands === '' ||
      this.registerForm.value.tands === false) {
      return;
    }
    if (!this.isCaptchaPassed) {
      return;
    }
    this.spinner.show();
    let body = {
      'email': this.registerForm.controls.email.value,
      'nickName': this.registerForm.controls.nickName.value,
      'password': this.registerForm.controls.password.value,
      'confirmPassword': this.registerForm.controls.confirmPassword.value
    };
    this.authService.register(body)
      .subscribe(res => {
        if (res.status === 201) {
          this.error = '';
          this.success = res.body.email +
            '으로 인증메일이 발송되었습니다. 3시간 이내로 인증을 받으셔야 가입이 완료됩니다.' + '<br/><br/>' +
            '인증메일을 받지 못하셨다면 인증메일을 재발송해주세요.' + '<br/><br/>';

          localStorage.setItem('email', res.body.email);
          this.spinner.hide();
        }
      },
        error => {
          if (error.status === 400) {
            if (error.error === "Passwords do not match") {
              this.error = '입력된 두 비밀번호가 일치하지 않습니다.';
            }
            else if (error.error[0].code === "DuplicateUserName") {
              this.error = '이미 등록된 계정입니다.';
            }
            else if (error.error === "DuplicateNickName") {
              this.error = '이미 등록된 닉네임입니다.';
            }
            else if (error.error === "NickName cannot be empty") {
              this.error = '닉네임 필드가 필요합니다.'
            }
            else if (error.error === "NickName maxlength 10") {
              this.error = '닉네임은 10글자 이하로 입력해주세요.'
            }
          }
          else {
            this.error = '오류가 발생했습니다. 다시 시도해주세요.';
          }
          this.spinner.hide();
        }
      );
  }

  resendConfirmEmail() {
    var email = localStorage.getItem('email');
    this.authService.resend(email)
      .subscribe(res => {
        if (res.status === 200) {
          this.error = '';
          this.success = email +
            '으로 인증메일이 재발송되었습니다. 3시간 이내로 인증을 받으셔야 가입이 완료됩니다.' + '<br/><br/>' +
            '인증메일을 받지 못하셨다면 인증메일을 재발송해주세요.' + '<br/><br/>';

          this.snackBar.open('재발송되었습니다.', '', {
            duration: 3000,
            panelClass: ['green-snackbar']
          });
        }
      },
        error => {
          if (error.status === 404) {
            this.error = '존재하지 않는 계정입니다. 다시 회원가입을 해주세요.'
          }
          else if (error.status === 400) {
            if (error.error === "ResendEmailConfirmed") {
              this.error = '이미 인증이 완료된 계정입니다.';
            }
            else if (error.error === "ResendEmailRequired") {
              this.error = '오류가 발생했습니다. 다른 이메일 주소로 회원가입을 해주세요.';
            }
          }
          else {
            this.error = '오류가 발생했습니다. 다시 시도해주세요.';
          }
        }
      );
  }

  onNoClick(event) {
    // Close only when it is clicked, not enter pressed
    if (event.x !== 0 && event.y !== 0) {
      //this.dialogRef.close();
    }
  }

  onClickTermsOfService() {
    const dialogRef = this.dialog.open(TermsOfServiceDialog, {
      width: '1000px'
    });
  }
}