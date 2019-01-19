import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [   
    { path: 'upload-video', component: UploadVideoComponent },
    { path: '**', component: NotFoundComponent },

    { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },  
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },    
    { path: 'core', loadChildren: './core/core.module#CoreModule' },   
    { path: 'content-details', loadChildren: './content-details/content-details.module#ContentDetailsModule' },  
    { path: 'news', loadChildren: './world-news/news.module#NewsModule' },  
    { path: 'country-info', loadChildren: './country-info/country-info.module#CountryInfoModule' }, 
    { path: 'search-videos', loadChildren: './search-videos/search-videos.module#SearchVideosModule' }, 
    { path: 'uploader-rankings', loadChildren: './uploader-rankings/uploader-rankings.module#UploaderRankingsModule' }    
];
 
@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
