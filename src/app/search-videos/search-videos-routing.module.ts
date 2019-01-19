import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchVideosComponent } from './search-videos.component';

const routes: Routes = [
  { path: 'search-videos', component: SearchVideosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchVideosRoutingModule { }
