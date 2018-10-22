import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-token-expired',
  templateUrl: './token-expired.component.html',
  styleUrls: ['./token-expired.component.css']
})
export class TokenExpiredComponent implements OnInit {
  email = '';
  success = '';
  error = '';

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.route.snapshot.queryParamMap.has('email')) {
      this.email = this.route.snapshot.queryParamMap.get('email');
    }    
  }

  onSendClick() {
    this.authService.resend(this.email)
      .subscribe(res => {    
        if (res.status === 200) {
            this.error = '';
            this.success = this.email + '으로 재발송이 완료되었습니다. 이메일을 확인해주세요.'; 
            
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
}
