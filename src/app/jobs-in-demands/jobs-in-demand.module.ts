import { JobsInDemandPanelComponent } from './jobs-in-demand-panel/jobs-in-demand-panel.component';
import { JobsInDemandComponent } from './jobs-in-demand/jobs-in-demand.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { JobsInDemandRoutingModule } from './jobs-in-demand-routing.module';
import { JidDetailDialog } from './jobs-in-demand-panel/dialogs/jid-detail-dialog/jid-detail-dialog.component';
import { JidDescriptionDialog } from './jobs-in-demand-panel/dialogs/jid-description-dialog/jid-description-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    JobsInDemandRoutingModule,
    MaterialModule,
    SharedModule,
    NgxPaginationModule,
    MDBBootstrapModulesPro.forRoot()
  ],
  declarations: [
    JobsInDemandComponent,
    JobsInDemandPanelComponent,
    JidDetailDialog,
    JidDescriptionDialog
  ],
  exports: [
    JobsInDemandPanelComponent
  ]
})
export class JobsInDemandModule { }
