import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DataService } from '../shared/services/data.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent implements OnInit {
  email = '';
  youtubeAddress = '';
  isCaptchaPassed = false;
  error = '';
  siteKey = environment.RecaptchaSiteKey;
  isSubmitted: boolean = false;

  constructor(private dataService: DataService,
    private authService: AuthService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
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
    if (this.email === '' ||
      this.email.trim().length === 0 ||
      this.youtubeAddress === '' ||
      this.youtubeAddress.trim().length === 0) {
      return;
    } else if (!this.isCaptchaPassed) {
      return;
    } else {
      this.isSubmitted = true;

      let body = {
        'email': this.email,
        'youtubeAddress': this.youtubeAddress
      };

      this.dataService.uploadVideo(body)
        .subscribe(res => {
          if (res.status === 201) {
            this.email = '';
            this.youtubeAddress = '';
            this.isSubmitted = false;
            this.snackBar.open('감사합니다. 확인절차 후 본 사이트에 업로드 됩니다.', '', {
              duration: 5000,
              panelClass: ['green-snackbar']
            });
          }
        },
          error => {
            this.isSubmitted = false;
            if (error.error === "The Email field is not a valid e-mail address.") {
              this.snackBar.open('이메일 필드에 이메일 형식으로 입력해 주세요.', '', {
                duration: 5000,
                panelClass: ['warning-snackbar']
              });
            } else if (error.error === "The field YoutubeAddress must be a string or array type with a minimum length of '11'.") {
              this.snackBar.open('제대로 된 유튜브 주소를 입력해 주세요.', '', {
                duration: 5000,
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