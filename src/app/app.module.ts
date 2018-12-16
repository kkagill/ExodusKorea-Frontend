import { MaterialModule } from './shared/material.module';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RecaptchaModule, RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MDBBootstrapModulesPro, ToastModule } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthService } from './shared/services/auth.service';
import { DataService } from './shared/services/data.service';
import { ItemsService } from './shared/utils/items.service';
import { ConfigService } from './shared/utils/config.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { HttpErrorInterceptorService } from './shared/services/http-error-interceptor.service';
import { DataSharingService } from './shared/services/data-sharing.service';

import { AppComponent } from './app.component';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { DeleteCommentDialog } from './content-details/dialogs/delete-comment-dialog/delete-comment-dialog.component';
import { PriceInfoDetailDialog } from './content-details/dialogs/price-info-detail-dialog/price-info-detail-dialog.component';
import { NotifCommentDialog } from './core/header/dialogs/notif-comment-dialog.component';
import { AddMinimumColDialog } from './content-details/dialogs/add-minimum-col-dialog/add-minimum-col-dialog.component';
import { MinimumColDetailDialog } from './content-details/dialogs/minimum-col-detail-dialog/minimum-col-detail-dialog.component';
import { SearchFilterPipe } from './shared/pipes/search-filter.pipe';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { NewsComponent } from './news/news.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { SafeHtmlPipe } from './shared/pipes/safe-html.pipe';
import { SearchVideosComponent } from './search-videos/search-videos.component';
import { CountryInfoComponent } from './country-info/country-info.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TermsOfServiceDialog } from './auth/register/dialog/terms-of-service/terms-of-service.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    ContentDetailsComponent,
    DeleteCommentDialog,
    PriceInfoDetailDialog,
    NotifCommentDialog,
    AddMinimumColDialog,
    MinimumColDetailDialog,
    SearchFilterPipe,
    UploadVideoComponent,
    NewsComponent,
    NewsDetailComponent,
    SafeHtmlPipe,
    SearchVideosComponent,
    CountryInfoComponent,
    UserProfileComponent
  ],
  entryComponents: [
    DeleteCommentDialog,
    PriceInfoDetailDialog,
    NotifCommentDialog,
    AddMinimumColDialog,
    MinimumColDetailDialog,
    TermsOfServiceDialog
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
    FlexLayoutModule,
    MDBBootstrapModulesPro.forRoot(),
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule.forRoot()
  ],
  providers: [
    Title,  
    AuthService,
    JwtInterceptor, // Providing JwtInterceptor allow to inject JwtInterceptor manually into RefreshTokenInterceptor    
    DataService,
    ItemsService,
    ConfigService,
    AuthGuardService,
    MDBSpinningPreloader,
    DataSharingService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useExisting: JwtInterceptor, multi: true },
    { provide: RECAPTCHA_LANGUAGE, useValue: 'ko' }
    // { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
