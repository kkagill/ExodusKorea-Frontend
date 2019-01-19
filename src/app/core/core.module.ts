import { DateFormatPipe } from './../shared/pipes/date-format.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../shared/material.module';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { FooterComponent } from './footer/footer.component';
import { CoreRoutingModule } from './core-routing.module';
import { NotifCommentDialog } from './header/dialogs/notif-comment-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VideoNotFoundComponent } from './video-not-found/video-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    RouterModule,
    LayoutModule,
    MaterialModule,   
    ReactiveFormsModule,
    MDBBootstrapModulesPro.forRoot()
  ],
  declarations: [
    DateFormatPipe,
    HomeComponent,
    HeaderComponent,
    ErrorComponent,
    NotFoundComponent,
    FooterComponent,
    NotifCommentDialog,
    VideoNotFoundComponent
  ],
  exports: [  
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
