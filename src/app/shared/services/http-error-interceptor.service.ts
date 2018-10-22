import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse,
         HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry'; // don't forget the imports
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptorService implements HttpInterceptor {
 
  constructor(private injector: Injector) {}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const router = this.injector.get(Router);
    return next.handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            console.log('succeed');
          }
        }, error => {
            console.log(error);
            if (error.status === 500) {
              router.navigate(['error']);  
            }
        })
      )
    }
  }