import { ConfirmedComponent } from './core/confirmed/confirmed.component';
import { TokenExpiredComponent } from './core/token-expired/token-expired.component';
import { Routes, RouterModule } from '@angular/router'; 
import { ErrorComponent } from './core/error/error.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { HomeComponent } from './core/home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'error', component: ErrorComponent },
    { path: 'token-expired', component: TokenExpiredComponent },
    { path: 'confirmed', component: ConfirmedComponent },
    { path: '**', component: NotFoundComponent }
];
 
@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
