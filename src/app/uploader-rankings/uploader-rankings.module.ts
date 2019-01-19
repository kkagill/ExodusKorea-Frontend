import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { UploaderRankingComponent } from './uploader-ranking/uploader-ranking.component';
import { UploaderRankingPanelComponent } from './uploader-ranking-panel/uploader-ranking-panel.component';
import { DetailDialog } from './uploader-ranking-panel/dialogs/detail-dialog/detail-dialog.component';
import { UploaderRankingsRoutingModule } from './uploader-rankings-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UploaderRankingsRoutingModule,
    MaterialModule,
    SharedModule,
    NgxPaginationModule,
    MDBBootstrapModulesPro.forRoot()
  ],
  declarations: [
    UploaderRankingComponent,
    UploaderRankingPanelComponent,
    DetailDialog
  ],
  exports: [
    UploaderRankingPanelComponent
  ]
})
export class UploaderRankingsModule { }
