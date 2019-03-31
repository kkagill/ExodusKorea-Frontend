import { JidDetailDialog } from './jobs-in-demands/jobs-in-demand-panel/dialogs/jid-detail-dialog/jid-detail-dialog.component';
import { JobsInDemandModule } from './jobs-in-demands/jobs-in-demand.module';
import { SearchVideosModule } from './search-videos/search-videos.module';
import { AddUploaderDialog } from './admin/dialogs/add-uploader-dialog/add-uploader-dialog.component';
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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthService } from './shared/services/auth.service';
import { DataService } from './shared/services/data.service';
import { ItemsService } from './shared/utils/items.service';
import { ConfigService } from './shared/utils/config.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { HttpErrorInterceptorService } from './shared/services/http-error-interceptor.service';
import { DataSharingService } from './shared/services/data-sharing.service';

import { AppComponent } from './app.component';
import { DeleteCommentDialog } from './content-details/dialogs/delete-comment-dialog/delete-comment-dialog.component';
import { PriceInfoDetailDialog } from './content-details/dialogs/price-info-detail-dialog/price-info-detail-dialog.component';
import { NotifCommentDialog } from './core/header/dialogs/notif-comment-dialog.component';
import { AddMinimumColDialog } from './content-details/dialogs/add-minimum-col-dialog/add-minimum-col-dialog.component';
import { MinimumColDetailDialog } from './content-details/dialogs/minimum-col-detail-dialog/minimum-col-detail-dialog.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { TermsOfServiceDialog } from './auth/register/dialog/terms-of-service/terms-of-service.component';
import { EtcDialog } from './content-details/dialogs/minimum-col-detail-dialog/dialogs/etc-dialog/etc-dialog.component';
import { RoleGuardService } from './shared/services/role-guard.service';
import { AddSalaryInfoDialog } from './admin/dialogs/add-salary-info-dialog/add-salary-info-dialog.component';
import { CountryInfoModule } from './country-info/country-info.module';
import { AdminModule } from './admin/admin.module';
import { NewsModule } from './world-news/news.module';
import { SharedModule } from './shared/shared.module';
import { ContentDetailsModule } from './content-details/content-details.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { DetailDialog } from './uploader-rankings/uploader-ranking-panel/dialogs/detail-dialog/detail-dialog.component';
import { UploaderRankingsModule } from './uploader-rankings/uploader-rankings.module';
import { JidDescriptionDialog } from './jobs-in-demands/jobs-in-demand-panel/dialogs/jid-description-dialog/jid-description-dialog.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    UploadVideoComponent           
  ],
  entryComponents: [
    DeleteCommentDialog,
    PriceInfoDetailDialog,
    NotifCommentDialog,
    AddMinimumColDialog,
    MinimumColDetailDialog,
    TermsOfServiceDialog,
    EtcDialog,
    AddSalaryInfoDialog,
    AddUploaderDialog,
    DetailDialog,
    JidDetailDialog,
    JidDescriptionDialog
  ],
  imports: [
    CoreModule,
    AuthModule,   
    CountryInfoModule,
    AdminModule,
    // NewsModule,
    ContentDetailsModule,
    SearchVideosModule,
    UserProfileModule,
    UploaderRankingsModule,
    JobsInDemandModule,
    MaterialModule,
    SharedModule,
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
    RoleGuardService,
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
