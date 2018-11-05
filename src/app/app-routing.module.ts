import { ContentDetailsComponent } from './content-details/content-details.component';
import { Routes, RouterModule } from '@angular/router'; 
import { ErrorComponent } from './core/error/error.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { HomeComponent } from './core/home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'content-details/:id1/:id2', component: ContentDetailsComponent },
    { path: 'error', component: ErrorComponent },
    { path: '**', component: NotFoundComponent }    
];
 
@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
