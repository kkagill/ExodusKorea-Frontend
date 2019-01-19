import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { CountryInfoRoutingModule } from './country-info-routing.module';
import { PromisingFieldComponent } from './promising-field/promising-field.component';
import { SettlementGuideComponent } from './settlement-guide/settlement-guide.component';
import { LivingConditionComponent } from './living-condition/living-condition.component';
import { ImmigrationVisaComponent } from './immigration-visa/immigration-visa.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CountryInfoRoutingModule,   
    SharedModule,
    MDBBootstrapModulesPro.forRoot()
  ],
  declarations: [
    PromisingFieldComponent,
    SettlementGuideComponent,
    LivingConditionComponent,
    ImmigrationVisaComponent        
  ]
})
export class CountryInfoModule { }
