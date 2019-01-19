import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromisingFieldComponent } from './promising-field/promising-field.component';
import { SettlementGuideComponent } from './settlement-guide/settlement-guide.component';
import { LivingConditionComponent } from './living-condition/living-condition.component';
import { ImmigrationVisaComponent } from './immigration-visa/immigration-visa.component';

const routes: Routes = [
  { path: 'promising-field', component: PromisingFieldComponent },
  { path: 'settlement-guide', component: SettlementGuideComponent },
  { path: 'living-condition', component: LivingConditionComponent },
  { path: 'immigration-visa', component: ImmigrationVisaComponent },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryInfoRoutingModule { }
