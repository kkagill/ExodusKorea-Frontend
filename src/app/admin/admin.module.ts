import { ReactiveFormsModule } from '@angular/forms';
import { AddUploaderDialog } from './dialogs/add-uploader-dialog/add-uploader-dialog.component';
import { AddSalaryInfoDialog } from './dialogs/add-salary-info-dialog/add-salary-info-dialog.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MDBBootstrapModulesPro.forRoot()
  ],
  declarations: [
    AdminComponent,
    AddSalaryInfoDialog,
    AddUploaderDialog
  ]
})
export class AdminModule { }
