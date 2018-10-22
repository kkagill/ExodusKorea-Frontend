
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../shared/material.module';
import { TokenExpiredComponent } from './token-expired/token-expired.component';
import { ConfirmedComponent } from './confirmed/confirmed.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    HomeComponent,
    HeaderComponent,
    ErrorComponent,
    NotFoundComponent,
    TokenExpiredComponent,
    ConfirmedComponent
  ],
  exports: [  
    HeaderComponent
  ]
})
export class CoreModule { }
