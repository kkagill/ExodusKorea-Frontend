import { MaterialModule } from './shared/material.module';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RecaptchaModule, RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { FlexLayoutModule } from '@angular/flex-layout'

import { AuthService } from './shared/services/auth.service';
import { DataService } from './shared/services/data.service';
import { ItemsService } from './shared/utils/items.service';
import { ConfigService } from './shared/utils/config.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { NotificationService } from './shared/utils/notification.service';
import { HttpErrorInterceptorService } from './shared/services/http-error-interceptor.service';

import { DateFormatPipe } from './shared/pipes/date-format.pipe';

import { AppComponent } from './app.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    DateFormatPipe,
  ],
  imports: [
    CoreModule,
    AuthModule,   
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    }),
    NgxSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200']
      }
    }),
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    FlexLayoutModule
  ],
  providers: [
    Title,  
    AuthService,
    DataService,
    ItemsService,
    ConfigService,
    AuthGuardService,
    NotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService, multi: true },
    { provide: RECAPTCHA_LANGUAGE, useValue: 'ko' }
    // { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
