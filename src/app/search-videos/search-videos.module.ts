import { SearchVideosComponent } from './search-videos.component';
import { SearchVideosRoutingModule } from './search-videos-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    SearchVideosRoutingModule,
    MaterialModule,
    SharedModule,
    NgxPaginationModule,
    MDBBootstrapModulesPro.forRoot()
  ],
  declarations: [
    SearchVideosComponent
  ]
})
export class SearchVideosModule { }
