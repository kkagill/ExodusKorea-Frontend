import { RegisterComponent } from './../../auth/register/register.component';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { LoginComponent } from 'src/app/auth/login/login.component';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  email: string;
  nickName: string;
  password: string;  
  confirmPassword: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver,
              public dialog: MatDialog) {}
  
  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '410px',
      data: { email: this.email, password: this.password }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The login dialog was closed');     
    });
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '410px',
      data: { email: this.email, nickName: this.nickName, password: this.password, confirmPassword: this.confirmPassword }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The register dialog was closed');     
    });
  }
}
