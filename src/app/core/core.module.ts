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
import { FlexLayoutModule } from '@angular/flex-layout';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    MaterialModule,
    FlexLayoutModule,
    MDBBootstrapModulesPro.forRoot()
  ],
  declarations: [
    DateFormatPipe,
    HomeComponent,
    HeaderComponent,
    ErrorComponent,
    NotFoundComponent
  ],
  exports: [  
    HeaderComponent
  ]
})
export class CoreModule { }
