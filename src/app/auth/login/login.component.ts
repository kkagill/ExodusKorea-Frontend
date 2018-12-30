import { AuthService } from './../../shared/services/auth.service';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

export interface LoginDialogData {
  email: string;
  password: string;
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  error = '';
  email = '';
  emailFormControl;
  passwordFormControl;
  loginForm: FormGroup;

  constructor(public router: Router,
    public http: HttpClient,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginDialogData) {
    this.emailFormControl = new FormControl('', [Validators.email]);
    this.passwordFormControl = new FormControl('', []);
    this.loginForm = new FormGroup({
      email: this.emailFormControl,
      password: this.passwordFormControl,
    });
  }

  onSubmit() {
    if (this.loginForm.invalid || this.loginForm.value.email === '' || this.loginForm.value.password === '') {
      return;
    }
    this.spinner.show();
    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      .subscribe(res => {
        if (res) {
          this.spinner.hide();
          this.dialogRef.close();
          this.snackBar.open('로그인되었습니다.', '', {
            duration: 3000,
            panelClass: ['green-snackbar']
          });
        }
      },
        error => {
          if (error.status === 400) {
            if (error.error.error === "invalid_grant") {
              this.error = '이메일 또는 비밀번호가 일치하지 않습니다.';
            }
            else if (error.error.error === "consent_required") {
              this.error = '인증이 완료되지 않은 계정입니다.';
            }
          }
          else {
            this.error = '오류가 발생했습니다. 다시 시도해 주세요.';
          }
          this.spinner.hide();
        }
      );
  }

  goToForgotPwd() {
    this.dialog.open(ForgotPasswordComponent, {
      width: '410px',
      data: { email: this.email }
    });
  }

  goToRegister() {
    this.dialogRef.close();
    this.router.navigate(['register']);
  }

  onNoClick(event) {
    // Close only when it is clicked, not enter pressed
    if (event.x !== 0 && event.y !== 0) {
      this.dialogRef.close();
    }
  }
}