import { UserProfileComponent } from './user-profile.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    MaterialModule,
    SharedModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MDBBootstrapModulesPro.forRoot()
  ],
  declarations: [
    UserProfileComponent
  ]
})
export class UserProfileModule { }
