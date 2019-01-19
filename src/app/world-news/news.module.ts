import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { NewsComponent } from './news/news.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsRoutingModule } from './news-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    NewsRoutingModule,
    MaterialModule,
    NgxPaginationModule,
    SharedModule,
    MDBBootstrapModulesPro.forRoot()
  ],
  declarations: [
    NewsComponent,
    NewsDetailComponent
  ]
})
export class NewsModule { }
