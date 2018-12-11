import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, Validators, FormControl } from '@angular/forms';

export interface ForgotPwdDialogData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  error = '';
  success = '';
  email = '';
  emailFormControl;
  forgotPwdForm: FormGroup;

  constructor(private authService: AuthService,
              private spinner: NgxSpinnerService,
              public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ForgotPasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ForgotPwdDialogData) {
    this.emailFormControl = new FormControl('', [Validators.email]);
    this.forgotPwdForm = new FormGroup({
      email: this.emailFormControl
    });
  }

  onSubmit() {
    if (this.forgotPwdForm.invalid || this.forgotPwdForm.value.email === '') {
      return;
    }
    this.spinner.show();
    let body = { 'email': this.forgotPwdForm.controls.email.value };
    this.authService.forgotPassword(body)
      .subscribe(res => {
        if (res) {
          this.spinner.hide();
          this.error = "";
          this.success = '엑소더스 코리아 회원님,' + '<br/><br/>' + 
                         this.forgotPwdForm.controls.email.value + 
                         '으로 임시 비밀번호가 발송되었습니다.' + '<br/><br/>' + 
                         '1. 임시 비밀번호를 사용해서 로그인하시고' + '<br/>' + 
                         '2. 곧바로 비밀번호를 재변경하세요.' + '<br/>';
          
          this.snackBar.open('이메일이 발송되었습니다.', '', {
            duration: 3000,
            panelClass: ['green-snackbar']
          });
        }
      },
        error => {
          if (error.status === 400) {
            if (error.error === "EmailNotConfirmed") {                     
              this.error = '인증이 완료되지 않은 계정입니다.';
            }
          }
          else if (error.status === 404) {
            this.error = '존재하지 않는 계정입니다.';
          }
          else {
            this.error = '오류가 발생했습니다. 다시 시도해 주세요.';
          }
          this.spinner.hide();
        }
      );
  }

  onLoginClick() {
    this.dialogRef.close();
  }

  onBackClick(event) {
     // Close only when it is clicked, not enter pressed
    if (event.x !== 0 && event.y !== 0) {
      this.dialogRef.close();
    }
  }
}
