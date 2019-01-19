import { ContentDetailsRoutingModule } from './content-details-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { ContentDetailsComponent } from './content-details.component';
import { AddMinimumColDialog } from './dialogs/add-minimum-col-dialog/add-minimum-col-dialog.component';
import { DeleteCommentDialog } from './dialogs/delete-comment-dialog/delete-comment-dialog.component';
import { MinimumColDetailDialog } from './dialogs/minimum-col-detail-dialog/minimum-col-detail-dialog.component';
import { PriceInfoDetailDialog } from './dialogs/price-info-detail-dialog/price-info-detail-dialog.component';
import { EtcDialog } from './dialogs/minimum-col-detail-dialog/dialogs/etc-dialog/etc-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    ContentDetailsRoutingModule,
    MaterialModule,
    SharedModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MDBBootstrapModulesPro.forRoot()
  ],
  declarations: [
    ContentDetailsComponent,
    AddMinimumColDialog,
    DeleteCommentDialog,
    MinimumColDetailDialog,
    EtcDialog, 
    PriceInfoDetailDialog
  ]
})
export class ContentDetailsModule { }
