import { WithdrawMembershipComponent } from './withdraw-membership/withdraw-membership.component';
import { LogoutComponent } from './logout/logout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmedComponent } from './confirmed/confirmed.component';
import { TokenExpiredComponent } from './token-expired/token-expired.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'confirmed', component: ConfirmedComponent },
  { path: 'token-expired', component: TokenExpiredComponent },
  { path: 'withdraw-membership', component: WithdrawMembershipComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
