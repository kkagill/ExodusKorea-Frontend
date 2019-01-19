import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentDetailsComponent } from './content-details.component';

const routes: Routes = [
  { path: 'content-details/:id1/:id2/:id3', component: ContentDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentDetailsRoutingModule { }
