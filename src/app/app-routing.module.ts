import { UserProfileComponent } from './user-profile/user-profile.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { Routes, RouterModule } from '@angular/router'; 
import { ErrorComponent } from './core/error/error.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { HomeComponent } from './core/home/home.component';
import { NewsComponent } from './news/news.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { SearchVideosComponent } from './search-videos/search-videos.component';
import { CountryInfoComponent } from './country-info/country-info.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'content-details/:id1/:id2', component: ContentDetailsComponent },
    { path: 'search-videos', component: SearchVideosComponent },
    { path: 'news', component: NewsComponent },
    { path: 'news-detail/:id1/:id2/:id3', component: NewsDetailComponent },
    { path: 'country-info', component: CountryInfoComponent },
    { path: 'upload-video', component: UploadVideoComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'error', component: ErrorComponent },
    { path: '**', component: NotFoundComponent }    
];
 
@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
