import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploaderRankingComponent } from './uploader-ranking/uploader-ranking.component';

const routes: Routes = [
  { path: 'uploader-ranking', component: UploaderRankingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploaderRankingsRoutingModule { }
