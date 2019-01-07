import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry'; // don't forget the imports
import { tap, catchError, mergeMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { DataSharingService } from './data-sharing.service';
import { DataService } from './data.service';

@Injectable()
export class HttpErrorInterceptorService implements HttpInterceptor {
  email: string;
  password: string;

  constructor(private injector: Injector,
    private authService: AuthService,
    private dataService: DataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private dataSharingService: DataSharingService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const router = this.injector.get(Router);
    return next.handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            //console.log('succeed');
          }
        }), catchError((err) => {
          debugger;
          const errorResponse = err as HttpErrorResponse;        
          // Internal server errors are logged in Log_SiteException from the server before it is intercepted. 
          if (errorResponse.status === 500) {
            router.navigate(['error']);
          }
          // When logged in and access_token is expired (trying to access [Authorize] action)
          else if (errorResponse.status === 401 && this.authService.isTokenExpired()) {
            // Get new access token
            return this.authService.refresh()
              .pipe(
                // refresh_token is valid
                mergeMap(data => {
                  const cloneRequest = request.clone({ setHeaders: { 'Authorization': `Bearer ${data.access_token}` } });
                  // Retry with new access_token
                  return next.handle(cloneRequest);
                }),
                catchError(err => {
                  // When refresh token is expired (14 days), force user to login again
                  if (err.status === 400 &&
                    err.error.error === 'invalid_grant' &&
                    err.error.error_description === 'The specified refresh token is no longer valid.' ||
                    err.status === 400 &&
                    err.error.error === 'invalid_grant' &&
                    err.error.error_description === 'The specified refresh token is invalid.' ||
                    err.status === 400 &&
                    err.error.error === 'invalid_grant' &&
                    err.error.error_description === 'The refresh token is no longer valid.') {
                    this.authService.removeStorage();
                    this.snackBar.open('세션이 만료됐습니다. 다시 로그인 해주세요.', '', {
                      duration: 10000,
                      panelClass: ['warning-snackbar']
                    });                    
                    const dialogRef = this.dialog.open(LoginComponent, {
                      width: '410px',
                      data: { email: this.email, password: this.password }
                    });
                    dialogRef.afterClosed().subscribe(result => {
                      if (this.authService.isAuthenticated()) {                       
                        this.dataSharingService.loggedIn.next(true); // pass data to header.component.ts
                        router.navigate(['']);
                      }
                    });
                  } else {                    
                    router.navigate(['error']);
                  }

                  return throwError(err);
                }));
          }
          // Other error status (possibly 404 or 400) are logged in Log_HttpResponseException
          else {
            this.LogHttpResponseException(err);
            // if (this.authService.isAuthenticated()) {
            //   this.LogLoggedInHttpResponseException(err);
            // } else {
            //   this.LogHttpResponseException(err);
            // }
          }

          return throwError(err);
        })
      )
  }

  LogHttpResponseException(error: any) {
    let body = {};
    // 404 doesn't have error message
    if (error.error == null) {
      body = {
        'Status': error.status,
        'Error': "",
        'Message': error.message
      };
      // When error contains description
    } else if (error.error.error != null) {
      body = {
        'Status': error.status,
        'Error': error.error.error + ", " + error.error.error_description,
        'Message': error.message
      };
    } else {
      body = {
        'Status': error.status,
        'Error': error.error,
        'Message': error.message
      };
    }

    this.dataService.logHttpResponseException(body)
      .subscribe(res => {
      });
  }

  LogLoggedInHttpResponseException(error: any) {
    let body = {};
    // 404 doesn't have error message
    if (error.error == null) {
      body = {
        'Status': error.status,
        'Error': "",
        'Message': error.message,
        'UserId': this.authService.getUserId(),
        'Username': this.authService.getUserEmail()
      };
       // When error contains description
    } else if (error.error.error != null) {
      body = {
        'Status': error.status,
        'Error': error.error.error + ", " + error.error.error_description,
        'Message': error.message,
        'UserId': this.authService.getUserId(),
        'Username': this.authService.getUserEmail()
      };
    } else {
      body = {
        'Status': error.status,
        'Error': error.error,
        'Message': error.message,
        'UserId': this.authService.getUserId(),
        'Username': this.authService.getUserEmail()
      };
    }

    this.dataService.logLoggedInHttpResponseException(body)
      .subscribe(res => {
      });
  }
}