import { JobsInDemandComponent } from './jobs-in-demand/jobs-in-demand.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'jobs-in-demand', component: JobsInDemandComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsInDemandRoutingModule { }
