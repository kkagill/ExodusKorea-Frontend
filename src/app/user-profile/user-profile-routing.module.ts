import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { UserProfileComponent } from './user-profile.component';

const routes: Routes = [
  { path: 'account-info/:id', component: UserProfileComponent, canActivate: [AuthGuardService] }    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
