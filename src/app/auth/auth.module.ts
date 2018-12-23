import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '../shared/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TokenExpiredComponent } from './token-expired/token-expired.component';
import { ConfirmedComponent } from './confirmed/confirmed.component';
import { TermsOfServiceDialog } from './register/dialog/terms-of-service/terms-of-service.component';
import { LogoutComponent } from './logout/logout.component';
import { WithdrawMembershipComponent } from './withdraw-membership/withdraw-membership.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    }),
    HttpModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule
  ],
  declarations: [    
    LoginComponent, 
    RegisterComponent,
    ForgotPasswordComponent,
    ConfirmedComponent,
    TokenExpiredComponent,
    TermsOfServiceDialog,
    LogoutComponent,
    WithdrawMembershipComponent
  ]
})
export class AuthModule { }
